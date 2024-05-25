import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface IFormInput {
  username: string;
  email: string;
  password: string;
  birth: number;
  carrier: string;
  phone: string;
  name: string;
  gender: string;
  nationality: string;
}
const schema = yup
  .object({
    username: yup.string().required("* 사용자 이름은 필수입니다."),
    email: yup
      .string()
      .email("* 유효한 이메일 주소를 입력해주세요.")
      .required("* 이메일은 필수입니다."),
    password: yup
      .string()
      .min(6, " * 비밀번호는 최소 6자 이상이어야 합니다.")
      .required("* 비밀번호는 필수입니다."),
    name: yup
      .string()
      .typeError("* 정확한 성명을 작성해주세요")
      .required("* 이름은 필수정보 입니다."),
    birth: yup
      .number()
      .typeError("* 정확한 생년월일 을 입력해주세요")
      .test(
        "len",
        "* 생년월일 8자리를 다시 확인해주세요.",
        (val) => val !== undefined && val.toString().length === 8
      )
      .required("* 생년월일 필수정보 입니다."),
    carrier: yup.string().required("* 통신사를 선택해주세요."),
    phone: yup
      .string()
      .matches(
        /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/,
        "* 유효한 핸드폰 번호를 입력해주세요."
      )
      .required("* 핸드폰 번호는 필수입니다."),
    gender: yup.string().required("성별을 선택해주세요."),
    nationality: yup.string().required("국적을 선택해주세요."),
  })
  .required();
type ButtonType = "male" | "female" | "empty" | null;
type ButtonTypeTwo = "domestic" | "foreigner";

const Login = () => {
  //////////////////////////
  const [selectedButton, setSelectedButton] = useState<ButtonType>(null);
  const [selectedButtonTwo, setSelectedButtonTwo] =
    useState<ButtonTypeTwo>("domestic");

  const handleClickMale = () => {
    setSelectedButton(`male`);
  };

  const handleClickFemale = () => {
    setSelectedButton("female");
  };
  const handleClickEmpty = () => {
    setSelectedButton("empty");
  };
  const handleClickDomestic = () => {
    setSelectedButtonTwo(`domestic`);
  };

  const handleClickForeigner = () => {
    setSelectedButtonTwo("foreigner");
  };

  const getButtonStyle = (gender: string) => {
    return selectedButton === gender
      ? {
          border: "1px solid #2db400",
          outline: 0,
          textDecoration: "none",
          WebkitTextSizeAdjust: "none",
        }
      : {};
  };
  const getButtonStyleTwo = (nationality: string) => {
    return selectedButtonTwo === nationality
      ? {
          border: "1px solid #2db400",
          outline: 0,
          textDecoration: "none",
          WebkitTextSizeAdjust: "none",
        }
      : {};
  };
  //////////////////////////////////
  const [toggleSelectTelecom, setToggleSelectTelecom] = useState(true);

  const [togglestyle, setToggleStyle] = useState({
    backgroundPosition: "-342px -270px",
  });
  const ChangeToggle = () => {
    setToggleStyle({
      backgroundPosition:
        togglestyle.backgroundPosition === "-342px -270px"
          ? "-342px -248px"
          : "-342px -270px",
    });
    setToggleSelectTelecom(!toggleSelectTelecom);
  };
  const [eyestyle, setEyeStyle] = useState({
    backgroundPosition: "-256px -264px",
  });

  //////////////////////////////////////////
  const [passwordShown, setPasswordShown] = useState(false);

  const ChangeEye = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setEyeStyle({
      backgroundPosition:
        eyestyle.backgroundPosition === "-256px -264px"
          ? "-256px -296px"
          : "-256px -264px",
    });
    setPasswordShown(!passwordShown);
  };

  //
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    console.log("hi");
  };
  console.log({ formState: { errors } });
  console.log(handleSubmit(onSubmit));
  return (
    <Container>
      <Title>
        실명 인증된 아이디로 가입
        <ToggleIcon style={togglestyle} onClick={ChangeToggle} />
      </Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Wrapper>
          <Section>
            <UserIcon />
            <InputUser
              {...register("username")}
              placeholder="아이디"
              style={errors.username ? { border: "1px solid red" } : {}}
            ></InputUser>
            <UserInnerText>@naver.com</UserInnerText>
          </Section>

          <Section>
            <PasswordIcon />
            <InputPass
              type={passwordShown ? "text" : "password"}
              {...register("password")}
              placeholder="비밀번호"
              style={errors.password ? { border: "1px solid red" } : {}}
            />
            <EyeIcon type="button" style={eyestyle} onClick={ChangeEye} />
          </Section>

          <Section>
            <MailIcon />
            <InputEmail
              type="email"
              {...register("email")}
              placeholder="[선택] 이메일주소 (비밀번호 찾기 등 본인 확인"
            />
          </Section>
        </Wrapper>
        {errors.username && <Error>{errors.username.message}</Error>}
        {errors.password && <Error>{errors.password.message}</Error>}

        <Wrapper>
          <Section>
            <UserIcon />
            <InputUser
              {...register("name")}
              placeholder="이름"
              style={errors.name ? { border: "1px solid red" } : {}}
            ></InputUser>
          </Section>

          <Section>
            <CalenderIcon />
            <InputPass
              type="number"
              {...register("birth")}
              placeholder="생년월일 8자리"
              style={errors.birth ? { border: "1px solid red" } : {}}
            />
          </Section>

          {toggleSelectTelecom && (
            <Section>
              <TelecomIcon />
              <SelectTelecom
                {...register("carrier")}
                style={errors.carrier ? { border: "1px solid red" } : {}}
              >
                <OptionTelecom value="">통신사 선택</OptionTelecom>
                <OptionTelecom value="SKT">SKT</OptionTelecom>
                <OptionTelecom value="KT">KT</OptionTelecom>
                <OptionTelecom value="LGU+">LGU+</OptionTelecom>
              </SelectTelecom>
            </Section>
          )}

          {toggleSelectTelecom && (
            <Section>
              <ControllerWrapper>
                <div>
                  <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                      <>
                        <ControllerBtn
                          type="button"
                          onClick={handleClickMale}
                          style={getButtonStyle("male")}
                        >
                          남자
                        </ControllerBtn>
                        <ControllerBtn
                          type="button"
                          onClick={handleClickFemale}
                          style={getButtonStyle("female")}
                        >
                          여자
                        </ControllerBtn>
                      </>
                    )}
                  />
                </div>
                <div>
                  <Controller
                    name="nationality"
                    control={control}
                    render={({ field }) => (
                      <>
                        <ControllerBtn
                          type="button"
                          onClick={handleClickDomestic}
                          style={getButtonStyleTwo("domestic")}
                        >
                          내국인
                        </ControllerBtn>
                        <ControllerBtn
                          type="button"
                          onClick={handleClickForeigner}
                          style={getButtonStyleTwo("foreigner")}
                        >
                          외국인
                        </ControllerBtn>
                      </>
                    )}
                  />
                </div>
              </ControllerWrapper>
            </Section>
          )}

          {!toggleSelectTelecom && (
            <Section>
              <ControllerWrapper>
                <ControllerDiv>
                  <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                      <>
                        <ControllerBtn
                          type="button"
                          onClick={handleClickMale}
                          style={getButtonStyle("male")}
                        >
                          남자
                        </ControllerBtn>
                        <ControllerBtn
                          type="button"
                          onClick={handleClickFemale}
                          style={getButtonStyle("female")}
                        >
                          여자
                        </ControllerBtn>
                        <ControllerBtn
                          type="button"
                          onClick={handleClickEmpty}
                          style={getButtonStyle("empty")}
                        >
                          선택안함
                        </ControllerBtn>
                      </>
                    )}
                  />
                </ControllerDiv>
              </ControllerWrapper>
            </Section>
          )}

          {!toggleSelectTelecom && (
            <Section>
              <GlobeIcon />
              <SelectTelecom {...register("carrier")}>
                <OptionTelecom value="">대한민국 +82</OptionTelecom>
                <OptionTelecom value="SKT">SKT</OptionTelecom>
                <OptionTelecom value="KT">KT</OptionTelecom>
                <OptionTelecom value="LGU+">LGU+</OptionTelecom>
              </SelectTelecom>
            </Section>
          )}
          <Section>
            <PhoneIcon />
            <InputEmail
              type="string"
              {...register("phone")}
              placeholder="휴대전화번호"
              style={errors.phone ? { border: "1px solid red" } : {}}
            />
          </Section>
        </Wrapper>
        {errors.name && <Error>{errors.name.message}</Error>}
        {errors.birth && <Error>{errors.birth.message}</Error>}
        {toggleSelectTelecom && errors.carrier && (
          <Error>{errors.carrier.message}</Error>
        )}
        {errors.phone && <Error>{errors.phone.message}</Error>}
        <LoginBtn type="submit">회원가입</LoginBtn>
      </Form>
    </Container>
  );
};

export default Login;

const LoginBtn = styled.button`
  position: fixed;
  border: none;
  width: 80%;
  height: 40px;
  padding: 10px;
  font-size: 16px;
  color: #fff;
  font-weight: bold;
  border-radius: 10px;
  background: #09aa5c;
  cursor: pointer;
  bottom: 50px;
`;

const Container = styled.div`
  width: 100%;
  height: fit-content;
  padding-top: 20px;
`;
const Wrapper = styled.div`
  width: 100%;
  height: fit-content;

  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  margin-top: 10px;
`;
const Title = styled.div`
  font-size: 13px;
  text-align: right;
  line-height: 18px;
  letter-spacing: -0.4px;
  width: 100%;
  display: flex;
  justify-content: end;
  gap: 5px;
  margin-bottom: 10px;
`;
const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: fit-content;
`;
const Error = styled.p`
  text-align: left;
  width: 100%;
  margin: 10px 4px 0;
  font-size: 13px;
  line-height: 18px;
  color: #ff3f3f;
`;
const Section = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  position: relative;
`;

const InputUser = styled.input`
  width: 100%;
  border: none;
  font-size: 14px;
  line-height: 22px;
  color: #222;
  padding: 10px 0px 10px 45px;
  border: 1px solid #ccc;
  border-radius: 8px 8px 0px 0px;
  border-bottom: none;
  &:focus {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: 1px solid #2db400;
    outline: 0;
    text-decoration: none;
    cursor: pointer;
    -webkit-text-size-adjust: none;
  }
`;
const UserInnerText = styled.div`
  position: absolute;
  right: 15px;
  font-size: 13px;
`;
const InputPass = styled.input`
  width: 100%;
  border: none;
  font-size: 14px;
  line-height: 22px;
  color: #222;
  padding: 10px 0px 10px 45px;
  border: 1px solid #ccc;

  &:focus {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: 1px solid #2db400;
    outline: 0;
    text-decoration: none;
    cursor: pointer;
    -webkit-text-size-adjust: none;
  }
`;
const InputEmail = styled.input`
  width: 100%;
  border: none;
  font-size: 14px;
  line-height: 22px;
  color: #222;
  padding: 10px 0px 10px 45px;
  border: 1px solid #ccc;
  border-radius: 0px 0px 8px 8px;
  border-top: none;
  &:focus {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: 1px solid #2db400;
    outline: 0;
    text-decoration: none;
    cursor: pointer;
    -webkit-text-size-adjust: none;
  }
`;
const ControllerWrapper = styled.div`
  width: 100%;
  color: #222;
  padding: 10px 10px 10px 10px;
  border: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ControllerBtn = styled.button`
  width: 70px;
  padding: 5px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 3px;
  cursor: pointer;
`;
const ControllerDiv = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;
const SelectTelecom = styled.select`
  width: 100%;
  font-size: 14px;
  line-height: 22px;

  padding: 10px 0px 10px 45px;
  border: 1px solid #ccc;

  &:focus {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: 1px solid #2db400;
    outline: 0;

    text-decoration: none;
    cursor: pointer;
    -webkit-text-size-adjust: none;
  }
`;
const OptionTelecom = styled.option`
  color: #222;
`;
const UserIcon = styled.div`
  position: absolute;
  left: 5px;

  background: url("https://ssl.pstatic.net/static/nid/join/m_sp_06_realname_48b1e603.png");
  background-size: 372px 326px;
  background-position: -342px -64px;
  background-repeat: no-repeat;
  width: 30px;
  height: 30px;
`;
const PasswordIcon = styled.div`
  left: 5px;
  position: absolute;
  background: url("https://ssl.pstatic.net/static/nid/join/m_sp_06_realname_48b1e603.png");
  background-size: 372px 326px;
  background-position: -310px 0px;
  background-repeat: no-repeat;
  width: 30px;
  height: 30px;
`;
const ToggleIcon = styled.div`
  background: url("https://ssl.pstatic.net/static/nid/join/m_sp_06_realname_48b1e603.png");
  background-position: -342px -248px;
  background-size: 372px 326px;
  background-repeat: no-repeat;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const EyeIcon = styled.button`
  right: 5px;
  position: absolute;
  background: url("https://ssl.pstatic.net/static/nid/join/m_sp_06_realname_48b1e603.png");
  background-size: 372px 326px;
  background-position: -256px -264px;
  background-repeat: no-repeat;
  width: 30px;
  height: 30px;
  cursor: pointer;
  border: none;
`;
const MailIcon = styled.div`
  left: 5px;
  position: absolute;
  background: url("https://ssl.pstatic.net/static/nid/join/m_sp_06_realname_48b1e603.png");
  background-position: -96px -296px;
  background-repeat: no-repeat;
  width: 30px;
  height: 30px;
  background-size: 372px 326px;
`;
const CalenderIcon = styled.div`
  background: url("https://ssl.pstatic.net/static/nid/join/m_sp_06_realname_48b1e603.png");
  background-position: -192px -296px;
  background-repeat: no-repeat;
  position: absolute;
  left: 5px;
  width: 30px;
  height: 30px;
  background-size: 372px 326px;
`;
const GlobeIcon = styled.div`
  background: url("https://ssl.pstatic.net/static/nid/join/m_sp_06_realname_48b1e603.png");
  background-position: -32px -264px;
  background-repeat: no-repeat;
  position: absolute;
  left: 5px;
  width: 30px;
  height: 30px;
  background-size: 372px 326px;
`;
const PhoneIcon = styled.div`
  background: url("https://ssl.pstatic.net/static/nid/join/m_sp_06_realname_48b1e603.png");
  background-position: -310px -128px;
  background-repeat: no-repeat;
  position: absolute;
  left: 5px;
  width: 30px;
  height: 30px;
  background-size: 372px 326px;
`;
const TelecomIcon = styled.div`
  background: url("https://ssl.pstatic.net/static/nid/join/m_sp_06_realname_48b1e603.png");
  background-position: -224px -296px;
  background-repeat: no-repeat;
  position: absolute;
  left: 5px;
  width: 30px;
  height: 30px;
  background-size: 372px 326px;
`;
