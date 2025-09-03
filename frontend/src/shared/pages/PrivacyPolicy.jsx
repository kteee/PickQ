import { useEffect } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Layout>
        <Title>개인정보처리방침</Title>
        <Paragraph>
          픽큐(PickQ)(이하 ‘본 사이트’)는 개인정보 보호법에 따라 이용자의
          개인정보를 보호하고 권익을 보호하기 위해 아래와 같은 방침을
          수립합니다.
        </Paragraph>
        <Section>
          <SectionTitle>1. 수집하는 개인정보 항목</SectionTitle>
          <Paragraph>본 사이트는 다음과 같은 개인정보를 수집합니다.</Paragraph>
          <List>
            <li>회원가입 시: 이메일, 닉네임, 비밀번호</li>
            <li>
              소셜 로그인 시: Google에서 제공하는 이메일, 이름, 프로필 이미지 등
              기본 프로필 정보
            </li>
            <li>테스트 이용 시: 테스트 응답, 결과, 점수 등의 데이터</li>
            <li>
              접속 IP, 브라우저 정보, 기기 정보 등 (서비스 개선 및 보안 목적)
            </li>
          </List>
        </Section>
        <Section>
          <SectionTitle>2. 개인정보 수집 및 이용 목적</SectionTitle>
          <Paragraph>
            수집된 개인정보는 다음의 목적을 위해 사용됩니다.
          </Paragraph>
          <List>
            <li>회원 식별 및 로그인 기능 제공</li>
            <li>퀴즈 및 심리테스트 결과 저장 및 결과 기반 서비스 제공</li>
            <li>통계 및 데이터 기반 기능 개선</li>
            <li>외부 서비스(Google 로그인 등) 연동 처리</li>
          </List>
        </Section>
        <Section>
          <SectionTitle>3. 개인정보의 보유 및 이용 기간</SectionTitle>
          <List>
            <li>회원 탈퇴 시 수집된 개인정보는 지체 없이 파기됩니다.</li>
            <li>
              단, 관계 법령에 따라 일정 기간 보관이 필요한 정보는 해당 법령에
              따라 보관됩니다.
            </li>
            <li>
              테스트 결과 데이터는 통계 분석 또는 사용자 맞춤 서비스 제공을 위해
              회원과 연결된 형태로 보관될 수 있습니다.
            </li>
          </List>
        </Section>
        <Section>
          <SectionTitle>4. 개인정보의 제3자 제공</SectionTitle>
          <List>
            <ol>
              <li>
                본 사이트는 이용자의 개인정보를 원칙적으로 외부에 제공하지
                않습니다.
              </li>
              <li>
                다만, 아래의 경우 예외로 합니다.
                <ul>
                  <li>이용자가 사전에 동의한 경우</li>
                  <li>법령에 따라 요구되는 경우</li>
                </ul>
              </li>
            </ol>
          </List>
        </Section>
        <Section>
          <SectionTitle>5. 개인정보 처리의 위탁</SectionTitle>
          <Paragraph>
            본 사이트는 다음과 같은 외부 서비스를 연동하거나 위탁할 수 있습니다.
          </Paragraph>
          <List>
            <li>Google OAuth: 소셜 로그인 기능 제공</li>
            <li>
              기타 클라우드 서비스 (AWS, MongoDB 등) 사용 시, 해당 서버에 정보가
              저장될 수 있음
            </li>
          </List>
        </Section>
        <Section>
          <SectionTitle>6. 이용자의 권리와 행사 방법</SectionTitle>
          <Paragraph>이용자는 다음과 같은 권리를 행사할 수 있습니다.</Paragraph>
          <List>
            <li>언제든지 자신의 개인정보 열람, 수정, 삭제 요청 가능</li>
            <li>회원 탈퇴 시, 수집된 정보는 지체 없이 파기됩니다.</li>
          </List>
        </Section>
        <Section>
          <SectionTitle>7. 개인정보 보호 책임자</SectionTitle>
          <List>
            <li>책임자: 김태은</li>
            <li>이메일: kte02320@gmail.com</li>
            <li>문의사항이 있는 경우 위 이메일로 연락 바랍니다.</li>
          </List>
        </Section>
        <Section>
          <SectionTitle>8. 개인정보의 안전성 확보 조치</SectionTitle>
          <Paragraph>
            본 사이트는 이용자의 개인정보 보호를 위해 아래와 같은 조치를 취하고
            있습니다.
          </Paragraph>
          <List>
            <li>비밀번호는 암호화 저장됩니다.</li>
            <li>외부 접근이 제한된 DB 환경에서 개인정보를 관리합니다.</li>
            <li>최소한의 인원만 개인정보에 접근하도록 관리합니다.</li>
          </List>
        </Section>
        <Section>
          <SectionTitle>9. 변경사항 고지</SectionTitle>
          <Paragraph>
            본 방침은 변경 시 ‘시행일자’ 또는 ‘최종 수정일’ 갱신을 통해
            고지합니다.
          </Paragraph>
        </Section>
        <Paragraph>시행일자: 2025년 8월 25일</Paragraph>
      </Layout>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;

const Layout = styled.div`
  max-width: 1000px;
  margin: 0px auto 50px auto;
  line-height: 1.6;
  font-size: 14.5px;
  color: #333;

  @media (max-width: 640px) {
    padding: 0 18px;
  }
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: bold;
  margin-top: 40px;
  margin-bottom: 15px;
`;

const Section = styled.section`
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Paragraph = styled.p`
  margin-bottom: 20px;
`;

const List = styled.ul`
  padding-left: 20px;
  list-style-type: disc;

  ol {
    padding-left: 0px;
  }

  li {
    margin-bottom: 6px;
  }

  ul {
    padding-left: 20px;
    margin-top: 5px;
  }
`;
