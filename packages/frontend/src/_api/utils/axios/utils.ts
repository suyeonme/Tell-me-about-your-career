export const generateMessageByStatusCode = (
  statusCode: number,
  errorMessage?: string
) => {
  switch (statusCode) {
    case 400:
      return "잘못된 요청입니다.";
    case 401: {
      return "인증 실패입니다.";
    }
    case 403: {
      return "권한이 없습니다.";
    }
    case 404: {
      return "찾을 수 없는 페이지입니다.";
    }
    case 500: {
      return "서버 오류입니다.";
    }
    default: {
      return `에러가 발생했습니다. ${errorMessage ?? ""}`;
    }
  }
};
