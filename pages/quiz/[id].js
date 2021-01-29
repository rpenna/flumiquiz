import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';

export default function QuizDaGaleraPage({ externalDb }) {
  console.log(externalDb);
  return (
    <ThemeProvider theme={externalDb.theme}>
      <QuizScreen
        externalQuestions={externalDb.questions}
        externalBg={externalDb.bg}
      />
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  try {
    const [projectName, githubUser] = context.query.id.split('___');
    const link = `https://${projectName}.${githubUser}.vercel.app/api/db`;
    const externalDb = await fetch(link)
      .then((answer) => {
        if (answer.ok) {
          return answer.json();
        }
        throw new Error('Failed to read data from external database');
      })
      .then(((objectAnswer) => objectAnswer))
      .catch((error) => {
        console.error(error);
      });
    return {
      props: {
        externalDb,
      },
    };
  } catch (error) {
    throw new Error(error);
  }
}
