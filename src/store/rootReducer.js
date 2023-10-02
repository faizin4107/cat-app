import layout from "./layout";
import auth from "./api/auth/authSlice";
import soal from "./api/app/soalSlice";
import incsoal from "./api/app/incrementSoal";

const rootReducer = {
  layout,
  auth,
  soal,
  incsoal
};
export default rootReducer;
