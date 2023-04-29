import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateStatus } from "../redux/admin";
import { useNavigate } from "react-router-dom";
const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.removeItem("admin");
    localStorage.removeItem("adminToken");
    dispatch(updateStatus(false));
    navigate("/admin/login");
  }, [navigate]);
};

export default Logout;
