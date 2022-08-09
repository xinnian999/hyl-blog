import {
  useLocation,
  useNavigate,
  useParams,
  useMatch,
} from "react-router-dom";

export default function withRouter(Child: any) {
  return (props: any) => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    const match = useMatch(location.pathname);
    const result = new URLSearchParams(location.search);
    return (
      <Child
        {...props}
        navigate={navigate}
        location={location}
        params={params}
        match={match}
        result={result}
      />
    );
  };
}
