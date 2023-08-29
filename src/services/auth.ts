import { axiosRequest, multipartrequest } from "./index";
import { LogInBody, ResetPasswordBody } from "@/src/types/apiTypes";

//회원가입
export const signUp = async (body: FormData) => {
  const res = await multipartrequest.post("/auth/signup", body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log("회원가입 서버 응답데이터", res);
  return res;
};

// 이메일 중복 체크
export const duplicateCheck = async (email: string) => {
  const res = await axiosRequest.get(`/auth/exists/email?input=${email}`);
  console.log("email 중복", res);
  return res;
};

// 로그인
export const logIn = async ({ email, password }: LogInBody) => {
  const res = await axiosRequest.post("/auth/login", { email, password });
  return res;
};

// 비밀번호 재설정
export const getEmailCode = async (email: string) => {
  const res = await axiosRequest.get(`/auth/email/code-requests/password?email=${email}`);
  return res;
};

// 이메일 코드 전송
export const sendEmailCode = async (email: string) => {
  console.log("email", email);
  const res = await axiosRequest.get(`/auth/email/code-requests/signup?email=${email}`);
  return res;
};

// 이메일 코드 인증
export const getVerificationEmail = async (email: string, code: string) => {
  console.log(email, code);
  const res = await axiosRequest.get(`/auth/email/verification?email=${email}&code=${code}`);
  return res;
};

// 비밀번호 재설정
export const resetPassword = async ({ oldPassword, newPassword }: ResetPasswordBody) => {
  const res = await axiosRequest.put("/auth/password/reset", { oldPassword, newPassword });
  return res;
};

// 카카오 코드 전송
export const sendKakaoCode = async (code: string) => {
  console.log(`sendKakaoCode`, code);
  const res = await axiosRequest.get(`/auth/login/kakao?code=${code}`);
  console.log("카카오 코드 응답데이터", res);
  return res;
};
