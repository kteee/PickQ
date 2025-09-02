import { useEffect } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";

const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Layout>
        <Title>PickQ 이용약관</Title>
        <Paragraph>
          본 약관은 PickQ(이하 ‘본 사이트’)의 이용과 관련된 권리·의무 및
          책임사항을 규정합니다.
        </Paragraph>
        <Section>
          <SectionTitle>제1조 (목적)</SectionTitle>
          <Paragraph>
            이 약관은 본 사이트가 제공하는 퀴즈 및 심리테스트 서비스(이하
            ‘서비스’)의 이용 조건과 절차, 이용자와 사이트 간의 권리와 의무를
            규정함을 목적으로 합니다.
          </Paragraph>
        </Section>
        <Section>
          <SectionTitle>제2조 (용어의 정의)</SectionTitle>
          <List>
            <ol>
              <li>이용자: 본 사이트에 접속하여 서비스를 이용하는 자</li>
              <li>회원: 이메일 또는 소셜 계정으로 회원가입한 자</li>
              <li>비회원: 로그인 없이 일부 기능을 이용하는 자</li>
            </ol>
          </List>
        </Section>
        <Section>
          <SectionTitle>제3조 (약관의 효력 및 변경)</SectionTitle>
          <List>
            <ol>
              <li>
                본 약관은 사이트 초기화면 또는 별도 페이지에 게시함으로써 효력이
                발생합니다.
              </li>
              <li>
                운영상 필요 시 사전 공지 없이 변경될 수 있으며, 변경 시 사이트에
                게시됩니다.
              </li>
              <li>
                변경된 약관에 동의하지 않을 경우 회원탈퇴가 가능하며, 이후
                서비스를 계속 이용하면 변경된 약관에 동의한 것으로 간주됩니다.
              </li>
            </ol>
          </List>
        </Section>
        <Section>
          <SectionTitle>제4조 (회원가입)</SectionTitle>
          <List>
            <ol>
              <li>
                회원은 이메일, 닉네임, 비밀번호를 입력하여 가입하거나, Google
                등의 외부 계정을 통해 가입할 수 있습니다.
              </li>
              <li>
                입력한 정보는 정확해야 하며, 허위 정보 입력 시 이용 제한이
                발생할 수 있습니다.
              </li>
              <li>만 14세 미만은 보호자 동의 없이 회원가입이 제한됩니다.</li>
            </ol>
          </List>
        </Section>
        <Section>
          <SectionTitle>제5조 (서비스 제공)</SectionTitle>
          <List>
            <ol>
              <li>
                본 사이트는 아래와 같은 서비스를 제공합니다.
                <ul>
                  <li>퀴즈 및 심리테스트 기능</li>
                  <li>테스트 결과 제공 및 저장</li>
                </ul>
              </li>
              <li>
                서비스는 무료로 제공되며, 기능은 예고 없이 추가·변경·종료될 수
                있습니다.
              </li>
            </ol>
          </List>
        </Section>
        <Section>
          <SectionTitle>제6조 (이용자의 의무)</SectionTitle>
          <Paragraph>이용자는 다음 행위를 해서는 안 됩니다.</Paragraph>
          <List>
            <ol>
              <li>타인의 개인정보 도용</li>
              <li>서비스의 정상 운영을 방해하는 행위</li>
              <li>저작권 및 기타 권리를 침해하는 행위</li>
              <li>욕설, 혐오, 비방, 광고 등 부적절한 콘텐츠 작성</li>
            </ol>
          </List>
        </Section>
        <Section>
          <SectionTitle>제7조 (개인정보 보호)</SectionTitle>
          <Paragraph>
            이용자의 개인정보는 「개인정보처리방침」에 따라 보호되며, 서비스
            이용 시 개인정보 제공에 동의한 것으로 간주됩니다.
          </Paragraph>
        </Section>
        <Section>
          <SectionTitle>제8조 (회원 탈퇴 및 이용 제한)</SectionTitle>
          <List>
            <ol>
              <li>
                회원은 언제든지 탈퇴할 수 있으며, 탈퇴 시 저장된 데이터는
                삭제됩니다.
              </li>
              <li>
                본 사이트는 이용자가 약관을 위반할 경우 사전 통보 없이 이용을
                제한하거나 탈퇴시킬 수 있습니다.
              </li>
            </ol>
          </List>
        </Section>
        <Section>
          <SectionTitle>제9조 (면책조항)</SectionTitle>
          <List>
            <ol>
              <li>
                본 사이트는 무료 서비스로, 서비스 이용과 관련하여 발생한
                직·간접적 손해에 대해 법적 책임을 지지 않습니다.
              </li>
              <li>
                테스트 결과는 재미와 참고용일 뿐, 전문적인 진단이나 조언이
                아닙니다.
              </li>
            </ol>
          </List>
        </Section>
        <Section>
          <SectionTitle>제10조 (기타사항)</SectionTitle>
          <List>
            <ol>
              <li>
                본 약관에 명시되지 않은 사항은 관계 법령 및 상관례에 따릅니다.
              </li>
              <li>
                문의사항은 아래 이메일을 통해 접수 가능합니다.
                <ul>
                  <li>이메일: kte02320@gmail.com</li>
                </ul>
              </li>
            </ol>
          </List>
        </Section>
        <Paragraph>시행일자: 2025년 8월 25일</Paragraph>
      </Layout>
      <Footer />
    </>
  );
};

export default TermsOfService;

const Layout = styled.div`
  max-width: 1000px;
  margin: 0px auto 50px auto;
  line-height: 1.6;
  font-size: 14.5px;
  color: #333;
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
