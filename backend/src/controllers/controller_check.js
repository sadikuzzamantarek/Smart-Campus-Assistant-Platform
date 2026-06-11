import CheckServices from "../services/service_check.js";
export default class CheckController {
  service = new CheckServices();
  checkController = async (req, res) => {
    res.send("Check the terminal/console");
    console.log("Controller Checked");
    return this.service.checkService();
  };
  checkAuth = async (req, res) => {
    console.log(req.user);
    res.send("Check The Console for decoded info")
  };
}
