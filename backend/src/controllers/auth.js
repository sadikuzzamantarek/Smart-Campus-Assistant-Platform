import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { responseReturn } from "../utils/response.js";
//helper
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export default class AuthController {
  register = async (req, res) => {
    try {
      const {
        role,
        name,
        email,
        password,
        studentId,
        levelTerm,
        department,
        designation,
        phone,
        address,
      } = req.body;
      console.log(req.body);

      // --- Common validation ---
      if (!name || !email || !password || !role) {
        return responseReturn(
          res,
          false,
          400,
          "Name, email, password and role are required",
        );
      }

      if (!["student", "teacher"].includes(role)) {
        return responseReturn(
          res,
          false,
          400,
          "Role must be 'student' or 'teacher'",
        );
      }

      // --- Role‑specific validation ---
      if (role === "student") {
        if (!studentId || !levelTerm || !department) {
          return responseReturn(
            res,
            false,
            400,
            "Students must provide studentId and levelTerm and Department",
          );
        }
      } else if (role === "teacher") {
        if (!department || !designation) {
          return responseReturn(
            res,
            false,
            400,
            "Teachers must provide department and designation",
          );
        }
      }

      // --- Check existing user ---
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return responseReturn(res, false, 409, "Email already registered");
      }

      if (role === "student") {
        const existingStudentId = await User.findOne({ studentId });
        if (existingStudentId) {
          return responseReturn(res, false, 409, "Student ID already exists");
        }
      }

      // --- Hash password ---
      const hashedPassword = await bcrypt.hash(password, 10);

      // --- Build user object ---
      const userData = {
        name,
        email,
        password: hashedPassword,
        role,
        phone: phone || "",
        address: address || "",
        department: department,
      };

      if (role === "student") {
        userData.studentId = studentId;
        userData.levelTerm = levelTerm;
      } else if (role === "teacher") {
        userData.designation = designation;
      }

      // --- Save user ---
      const user = new User(userData);
      await user.save();

      // --- Prepare response (exclude password) ---
      const userResponse = user.toObject();
      delete userResponse.password;

      // Generate token
      const token = generateToken(user._id, user.role);

      return responseReturn(res, true, 201, "Registration successful", {
        user: userResponse,
        token,
      });
    } catch (error) {
      console.error("Registration error:", error);
      return responseReturn(
        res,
        false,
        500,
        "Server error during registration",
        error.message,
      );
    }
  };

  login = async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return responseReturn(
          res,
          false,
          400,
          "Email and password are required",
        );
      }

      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return responseReturn(res, false, 401, "Invalid email or password");
      }

      // Check if account is active
      if (!user.isActive) {
        return responseReturn(
          res,
          false,
          403,
          "Account is deactivated. Contact admin.",
        );
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return responseReturn(res, false, 401, "Invalid email or password");
      }

      // Update last login time
      user.lastLogin = new Date();
      await user.save();

      // Generate token
      const token = generateToken(user._id, user.role);

      // Prepare user response (exclude password)
      const userResponse = user.toObject();
      delete userResponse.password;

      return responseReturn(res, true, 200, "Login successful", {
        user: userResponse,
        token,
      });
    } catch (error) {
      console.error("Login error:", error);
      return responseReturn(
        res,
        false,
        500,
        "Server error during login",
        error.message,
      );
    }
  };

  //forgot password
  forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;

      if (!email) {
        return responseReturn(res, false, 400, "Email is required");
      }

      const user = await User.findOne({ email });
      if (!user) {
        // For security, don't reveal that email doesn't exist
        return responseReturn(
          res,
          true,
          200,
          "If that email exists, a reset link has been sent",
        );
      }

      // Generate a secure random token
      const resetToken = crypto.randomBytes(32).toString("hex");

      // Hash token before storing (for extra security)
      const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

      user.passwordResetToken = hashedToken;
      user.passwordResetExpires = Date.now() + 60 * 60 * 1000; // 1 hour

      await user.save();

      // Send email with the raw (unhashed) token
      await sendPasswordResetEmail(user.email, resetToken, user.name);

      return responseReturn(
        res,
        true,
        200,
        "Password reset link sent to your email",
      );
    } catch (error) {
      console.error("Forgot password error:", error);
      return responseReturn(res, false, 500, "Server error", error.message);
    }
  };
  //reset password
  resetPassword = async (req, res) => {
    try {
      const { token, newPassword } = req.body;

      if (!token || !newPassword) {
        return responseReturn(
          res,
          false,
          400,
          "Token and new password are required",
        );
      }

      if (newPassword.length < 6) {
        return responseReturn(
          res,
          false,
          400,
          "Password must be at least 6 characters",
        );
      }

      // Hash the received token to compare with stored hash
      const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

      const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }, // token not expired
      });

      if (!user) {
        return responseReturn(
          res,
          false,
          400,
          "Invalid or expired reset token",
        );
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      user.password = hashedPassword;
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;

      await user.save();

      return responseReturn(
        res,
        true,
        200,
        "Password reset successful. Please login with your new password.",
      );
    } catch (error) {
      console.error("Reset password error:", error);
      return responseReturn(res, false, 500, "Server error", error.message);
    }
  };
}
