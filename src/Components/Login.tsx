import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
interface IFormInput {
  username: string;
  email: string;
  password: string;
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
  })
  .required();

const Login = () => {
  //
  const [togglestyle, setToggleStyle] = useState({
    backgroundPosition: "-342px -248px",
  });
  const ChangeToggle = () => {
    setToggleStyle({
      backgroundPosition:
        togglestyle.backgroundPosition === "-342px -248px"
          ? "-342px -270px"
          : "-342px -248px",
    });
  };
  const [eyestyle, setEyeStyle] = useState({
    backgroundPosition: "-256px -264px",
  });
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
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const dasd = () => {
    console.log(errors);
  };
  dasd();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    // 회원가입 로직을 여기에 구현합니다.
  };
  return (
    <Container>
      <Title>
        실명 인증된 아이디로 가입
        <ToggleIcon style={togglestyle} onClick={ChangeToggle} />
      </Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Section>
          <UserIcon />
          <InputUser {...register("username")} placeholder="아이디"></InputUser>
          <UserInnerText>@naver.com</UserInnerText>
        </Section>

        <Section>
          <PasswordIcon />
          <InputPass
            type={passwordShown ? "text" : "password"}
            {...register("password")}
            placeholder="비밀번호"
          />
          <EyeIcon style={eyestyle} onClick={ChangeEye} />
        </Section>

        <Section>
          <MailIcon />
          <InputEmail
            type="email"
            {...register("email")}
            placeholder="[선택] 이메일주소 (비밀번호 찾기 등 본인 확인"
          />
        </Section>
        {errors.username && <Error>{errors.username.message}</Error>}
        {errors.password && <Error>{errors.password.message}</Error>}
        {errors.email && <Error>{errors.email.message}</Error>}
        <button type="submit">회원가입</button>
      </Form>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 20px;
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
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 155px;
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
  width: 30px;
  height: 30px;
  background-size: 372px 326px;
`;
const GlobeIcon = styled.div`
  background: url("https://ssl.pstatic.net/static/nid/join/m_sp_06_realname_48b1e603.png");
  background-position: -32px -264px;
  background-repeat: no-repeat;
  width: 30px;
  height: 30px;
  background-size: 372px 326px;
`;
const PhoneIcon = styled.div`
  background: url("https://ssl.pstatic.net/static/nid/join/m_sp_06_realname_48b1e603.png");
  background-position: -310px -128px;
  background-repeat: no-repeat;
  width: 30px;
  height: 30px;
  background-size: 372px 326px;
`;
