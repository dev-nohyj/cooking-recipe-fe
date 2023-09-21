interface Props {}

const Head: React.FC<Props> = () => {
    return (
        <>
            <title>Food Share | 음식에 대한 정보 Food Share에서 시작하세요!</title>
            <link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />
            <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
            <meta name="msapplication-TileColor" content="#da532c" />
            <meta name="theme-color" content="#ffffff" />
            <meta
                name="keywords"
                content="레시피, 요리, 음식, 조리법, 레시피 공유, 요리 블로그, 요리 팁, 요리 재료, 요리 방법, 요리 아이디어, 레시피 검색, 푸드 블로그, 요리법 공유"
            />
            <meta
                name="description"
                content="다양한 레시피와 요리에 관한 정보를 제공합니다. 레시피 아이디어를 찾고 공유하세요. 요리 방법, 조리법, 요리 팁, 그리고 더 많은 음식 관련 콘텐츠가 여기에서 기다리고 있습니다."
            />
            <meta property="og:type" content="website" />
            <meta property="og:image" content={'/ogImage.png'} />
            <meta property="og:article:author" content="dev-noyj" />
            <meta property="og:title" content="Food Share | 음식에 대한 정보 Food Share에서 시작하세요!" />
            <meta
                property="og:description"
                content="다양한 레시피와 요리에 관한 정보를 제공합니다. 레시피 아이디어를 찾고 공유하세요. 요리 방법, 조리법, 요리 팁, 그리고 더 많은 음식 관련 콘텐츠가 여기에서 기다리고 있습니다."
            />
            <meta property="og:url" content="https://www.foodshare.shop" />
            <link rel="canonical" href="https://www.foodshare.shop" />
        </>
    );
};

export default Head;
