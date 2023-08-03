import '../App.css';
import {useRecoilValue, useSetRecoilState} from "recoil";
import {axiosInstance, CONFIG, isLoginedSelector, loginedUserInfoAtom, loginedUserInfoSelector} from "../recoil";
import {Link, Navigate} from "react-router-dom";
import {useQuery} from "react-query";

const Search = () => {
    const { isLoading, error, data } = useQuery("bookList", async () => {
        // productList 는 캐싱키, 참고로 지금은 캐시 사용 안함
        // 참고로 axiosInstance 로 요청하면 알아서 엑세스 키가 헤더에 붙어서 요청됩니다.
        // 그것은 액시오스 인터셉터에서 자동으로 해줍니다.
        // 우리가 App 함수에서 그렇게 세팅 했습니다.
        const response = await axiosInstance.get(CONFIG.API_BOOK_LIST);

        return response.data;
    });
    const isLogined = useRecoilValue(isLoginedSelector); // 로그인 했는지 여부
    if (isLoading) {
        return <div class="loading-1">로딩중</div>;
    }

    if (error) {
        return <div class="error-1">{error.message}</div>;
    }
    if (!isLogined) return <Navigate to="/" replace />; // 로그인 안했다면 메인화면으로 보냄

    return (
        <section className="py-5">
            <div className="container px-5 my-5">
                <main className="mt-5 pt-5">
                    <div className="container-fluid px-4">
                        <h1 className="mt-4">책 목록</h1>

                        <div className="card mb-4">
                            <div className="card-header">
                                <a className="btn btn-primary float-end"
                                   href="register">
                                    <i className="fas fa-edit"></i> 글 작성
                                </a>
                            </div>
                            <div className="card-body">
                                <table className="table table-hover table-striped">
                                    <thead>
                                    <tr>
                                        <th className="text-align-center">책 고유번호</th>
                                        <th>제목</th>
                                        <th className="text-align-center">좋아요</th>
                                        <th className="text-align-center">작성일</th>
                                        <th className="text-align-center">대여가능여부</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {data.bookList.map((book)=>(
                                            <tr key={book.bookId}>
                                                <td className="text-align-center">{book.bookNumber}</td>
                                                <td>{book.bookName}</td>
                                                <td className="text-align-center">{book.stars}</td>
                                                <td className="text-align-center">{book.regDate}</td>
                                                <td className="text-align-center">{book.isAble ? "Y" : "N"}</td>
                                                <td><button onClick={() => console.log("Button clicked!")}>
                                                    대여신청
                                                </button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </section>
    );
}

export default Search;
