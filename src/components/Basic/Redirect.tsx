import { useEffect } from "react";
import { To, useNavigate } from "react-router-dom";

function Redirect({ to }: { to: To }) {
  let navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  });
  return null;
}

export default Redirect;
