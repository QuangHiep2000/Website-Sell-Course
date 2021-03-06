import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useHistory } from "react-router-dom";
import { variables } from "../Variables";
import { useState, useContext } from "react";
import { Context } from "../contexts/Context";

function Register() {
  const history = useHistory();
  const { setHocVien, hocVien } = useContext(Context);
  const [classErrName, setClassErrName] = useState("");
  const [classErrEmail, setClassErrEmail] = useState("");
  const [classErrInvalidEmail, setClassErrInvalidEmail] = useState("");
  const [classErrBirthday, setClassErrBirthday] = useState("");
  const [classErrPass, setClassErrPass] = useState("");
  const [classErrLengthPass, setClassErrLengthPass] = useState("");
  const [classErrComfirmPass, setClassErrComfirmPass] = useState("");
  const [password, setPassword] = useState("");
  const [classErrIsComfirmPass, setClassErrIsComfirmPass] = useState("");
  const [classCheckWarningEmail, setClassCheckWarningEmail] = useState("");
  const [classIsSuccess, setClassIsSuccess] = useState("");

  const [checkName, setCheckName] = useState(" class-err");
  const [checkMail, setCheckMail] = useState(" class-err");
  const [checkBirthday, setCheckBirthday] = useState(" class-err");
  const [checkPass, setCheckPass] = useState(" class-err");
  const [checkIsComfirmPass, setCheckIsComfirmPass] = useState(" class-err");

  const [dataUse, setDataUse] = useState({
    TenHocVien: "",
    EmailHocVien: "",
    MatKhau: "",
    NgaySinh: "",
    GioiTinh: "male",
    SoDuTaiKhoan: 0,
    AnhHocVien: "anhhocvien",
  });

  function createClick() {
    let checkEmailExist = hocVien.some((value) => {
      return value.EmailHocVien === dataUse.EmailHocVien;
    });
    if (!checkEmailExist) {
      history.push("/login");
      setClassCheckWarningEmail("");
      setClassIsSuccess(" issuccess");
      setHocVien([...hocVien, dataUse]);
      fetch(variables.API_URL + "hocvien", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataUse),
      })
        .then((res) => res.json())
        .then(
          (result) => {},
          (error) => {}
        );
    } else {
      setClassCheckWarningEmail(" showwarning-email");
    }
  }

  function handleSubmit() {
    setClassErrName(checkName);
    setClassErrEmail(checkMail);
    setClassErrBirthday(checkBirthday);
    setClassErrPass(checkPass);
    setClassErrComfirmPass(checkIsComfirmPass);
    if (
      checkName === "" &&
      checkMail === "" &&
      checkBirthday === "" &&
      checkPass === "" &&
      checkIsComfirmPass === "" &&
      classErrIsComfirmPass === ""
    ) {
      createClick();
    }
  }

  function handleBlurGender(e) {
    setDataUse({ ...dataUse, GioiTinh: e.target.value });
  }

  function handleBlurName(e) {
    if (!e.target.value) setClassErrName(" class-err");
    setDataUse({ ...dataUse, TenHocVien: e.target.value });
  }
  function handleFocusName() {
    setClassErrName("");
    setCheckName("");
  }
  function handleBlurEmail(e) {
    setDataUse({ ...dataUse, EmailHocVien: e.target.value });
    if (!e.target.value) {
      setClassErrEmail(" class-err");
    } else if (
      !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)
    )
      setClassErrInvalidEmail(" class-err");
  }
  function handleFocusEmail() {
    setClassErrEmail("");
    setClassErrInvalidEmail("");
    setCheckMail("");
  }

  function handleBlurBirthday(e) {
    setDataUse({ ...dataUse, NgaySinh: e.target.value });
    if (!e.target.value) setClassErrBirthday(" class-err");
  }
  function handleFocusBirthday() {
    setClassErrBirthday("");
    setCheckBirthday("");
  }

  function handleBlurPass(e) {
    setDataUse({ ...dataUse, MatKhau: e.target.value });
    if (!e.target.value) {
      setClassErrPass(" class-err");
    } else if (e.target.value.length < 8) {
      setClassErrLengthPass(" class-err");
      setPassword(e.target.value);
    } else setPassword(e.target.value);
  }

  function handleFocusPass() {
    setClassErrPass("");
    setClassErrLengthPass("");
    setCheckPass("");
  }

  function handleBlurComfirmPass(e) {
    if (!e.target.value) {
      setClassErrComfirmPass(" class-err");
    } else if (e.target.value !== password)
      setClassErrIsComfirmPass(" class-err");
  }
  function handleFocusComfirmPass() {
    setClassErrComfirmPass("");
    setClassErrIsComfirmPass("");
    setCheckIsComfirmPass("");
  }

  return (
    <div className="form-register">
      <div className="form-register__container">
        <Link to="">
          <img
            className="form-register__container__logo"
            src={variables.MEDIA_URL + "logo-big.png"}
            alt="logo"
          />
        </Link>
        <div className="form-register__container__form">
          <div className="form-register__container__form__in">
            <div className="form-register__container__form__in__title">
              ????NG K?? T??I KHO???N
            </div>
            <input
              onBlur={handleBlurName}
              onFocus={handleFocusName}
              className={"form-register__container__form__in__input-name-user"}
              type="text"
              placeholder="H??? v?? t??n"
            />
            <div
              className={
                "form-register__container__form__in_err-input " + classErrName
              }
            >
              Vui l??ng nh???p h??? v?? t??n c???a b???n!
            </div>
            <input
              onBlur={handleBlurEmail}
              onFocus={handleFocusEmail}
              className={
                "form-register__container__form__in__input-name-account"
              }
              type="text"
              placeholder="Email"
            />
            <div
              className={
                "form-register__container__form__in_err-input " + classErrEmail
              }
            >
              Vui l??ng nh???p Email!
            </div>
            <div
              className={
                "form-register__container__form__in_err-input " +
                classErrInvalidEmail
              }
            >
              Email kh??ng h???p l???!
            </div>
            <input
              className="form-register__container__form__in__input-bithday"
              type="text"
              onBlur={handleBlurBirthday}
              onFocus={(e) => {
                handleFocusBirthday(e);
                e.currentTarget.type = "date";
                e.currentTarget.focus();
              }}
              placeholder="Ng??y sinh"
            />
            <div
              className={
                "form-register__container__form__in_err-input" +
                classErrBirthday
              }
            >
              Vui l??ng nh???p ng??y sinh c???a b???n!
            </div>
            <input
              onBlur={handleBlurPass}
              onFocus={handleFocusPass}
              className="form-register__container__form__in__pass"
              type="password"
              placeholder="M???t kh???u"
            />
            <div
              className={
                "form-register__container__form__in_err-input" + classErrPass
              }
            >
              Vui l??ng nh???p m???t kh???u!
            </div>
            <div
              className={
                "form-register__container__form__in_err-input" +
                classErrLengthPass
              }
            >
              M???t kh???u c?? ????? d??i ph???i l???n h??n 8 k?? t???!
            </div>
            <input
              onBlur={handleBlurComfirmPass}
              onFocus={handleFocusComfirmPass}
              className="form-register__container__form__in__pass-confirm"
              type="password"
              placeholder="Nh???p l???i m???t kh???u"
            />
            <div
              className={
                "form-register__container__form__in_err-input" +
                classErrComfirmPass
              }
            >
              Vui l??ng nh???p l???i m???t kh???u!
            </div>
            <div
              className={
                "form-register__container__form__in_err-input" +
                classErrIsComfirmPass
              }
            >
              M???t kh???u nh???p l???i kh??ng ch??nh x??c!
            </div>
            <div className="form-register__container__form__in__gender">
              <label htmlFor="male">
                <input
                  onClick={handleBlurGender}
                  name="gender"
                  value="male"
                  id="male"
                  type="radio"
                  defaultChecked
                />{" "}
                Nam{" "}
              </label>
              <label htmlFor="female">
                <input
                  onClick={handleBlurGender}
                  name="gender"
                  value="female"
                  id="female"
                  type="radio"
                />{" "}
                N???{" "}
              </label>
            </div>
            <div
              className={
                "form-register__container__form__warning" +
                classCheckWarningEmail
              }
            >
              Email ???? t???n t???i!
            </div>
            <div
              className={
                "form-register__container__form__issuccess" + classIsSuccess
              }
            >
              ????ng k?? th??nh c??ng
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="form-register__container__form__in__btn"
            >
              ????NG K??
            </button>
            <div className="form-register__container__form__in__transform">
              B???n c?? t??i kho???n? <Link to="/login"> ????ng nh???p</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
