import Link from 'next/link';
import styles from '../../styles/Organisms.module.scss';

const MobileNavigator = () => {
    return (
        <>
            <div className={styles.mobile_nav_header}>
                <span className={styles.title}>MAGOODGAN</span>
                <Link href="/user/login">
                    <a className={styles.login_btn}>로그인</a>
                </Link>
            </div>
            <div className={styles.mobile_nav_banner}>
                banner
            </div>
            <nav className={styles.mobile_nav_category}>
                <div className={styles.col}>
                    <Link href="/">마굿간 공지</Link>
                    <Link href="/">이문세 글터</Link>
                    <Link href="/">새내기 인사</Link>
                    <Link href="/">자유 게시판</Link>
                    <hr />
                    <span>지역 게시판</span>
                    <Link href="/">서울 경기 강원</Link>
                    <Link href="/">대전 충청</Link>
                    <Link href="/">대구 경북</Link>
                    <Link href="/">부산 울산 경남</Link>
                    <Link href="/">광주 전라 제주</Link>
                    <Link href="/">해외</Link>
                    <hr />
                    <Link href="/">당신들의 천국</Link>
                    <hr />
                    <span>마굿간 앨범</span>
                    <Link href="/">이문세 앨범</Link>
                    <Link href="/">마굿간 행사</Link>
                    <Link href="/">가족 사진첩</Link>
                    <hr />
                    <span>마굿간 자료</span>
                    <Link href="/">기사 스크랩</Link>
                    <Link href="/">문세 자료실</Link>
                    <Link href="/">가족 보관함</Link>
                </div>
                <div className={styles.col}>
                    <span>마굿간 다실</span>
                    <Link href="/">후기감상실</Link>
                    <Link href="/">질문건의방</Link>
                    <Link href="/">설문조사방</Link>
                    <Link href="/">운영비내역</Link>
                    <hr />
                    <span>취미활동방</span>
                    <Link href="/">야구 동호회</Link>
                    <Link href="/">여행 동호회</Link>
                    <Link href="/">산악 동호회</Link>
                    <hr />
                    <span>마굿간 20주년</span>
                    <Link href="/">마굿간은oo다</Link>
                    <Link href="/">20주년축하멘트</Link>
                    <Link href="/">마굿간사용후기</Link>
                    <Link href="/">마굿간창고공개</Link>
                    <hr />
                    <span>이문세 SNS</span>
                    <Link href="/">유튜브</Link>
                    <Link href="/">페이스북</Link>
                    <Link href="/">인스타그램</Link>
                    <Link href="/">트위터</Link>
                    <hr />
                    <Link href="/">이문세 공식홈페이지</Link>
                    <Link href="/">이영훈 공식홈페이지</Link>
                    <Link href="/">마굿간 유튜브</Link>
                    <Link href="/">운영진회의</Link>
                </div>
            </nav>
        </>
    );
};

export default MobileNavigator;
