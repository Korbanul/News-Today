import { useEffect, useMemo, useState } from "react";
import { Badge, Button, Container } from "react-bootstrap";
import NewsCard from "./NewsCard";
import LoadingCard from "./LoadingCard";
import "../Style/navbar.css"
export default function NewsBoard({ category, setResultJson, SearchQuery }) {

    let [result, setResults] = useState([])
    let [finalResult, setfinalResult] = useState([])
    const [loading, setLoading] = useState(true);
    const [nextpage, setNextpage] = useState(null)

    async function getNews(append = false) {
        let er = false;
        let url = `https://newsdata.io/api/1/latest?apikey=${import.meta.env.VITE_NEWS_API_KEY}&category=${category}&country=bd&language=bn,en&timezone=asia/dhaka&removeduplicate=1&size=10`
        try {

            if (append && nextpage) {
                url += `&page=${nextpage}`;
            }
            setLoading(true)
            // let rawnews = await fetch(url)


            if (!rawnews.ok) {
                throw new Error(`HTTP error ${rawnews.status}`);
            }

            let jasonNews = await rawnews.json()
            setResultJson(jasonNews.results)
            setNextpage(jasonNews.nextPage);

            if (append) {
                setResults(prev => [...prev, ...(jasonNews.results ?? [])]);
            } else {
                setResults(jasonNews.results ?? []);
            }

        } catch (error) {
            console.error("Fetch error:", error);
            { error ? er = true : er = false }
        } finally {
            { er ? setLoading(true) : setLoading(false) }
        }
    }
    
    useEffect(() => {
        setNextpage(null);
        getNews(false)
        

    }, [category])



    let handleGetNews = () => {
        getNews(true)

    }

     useEffect(() => {

        if (SearchQuery.length<1 )
         {
            setfinalResult(result)
         }else{
            setfinalResult( result.filter(item =>
                item.title.toLowerCase().includes(SearchQuery.toLowerCase())
            ))
         }
    },[SearchQuery, result])


   
    return (
        <>

        <Container>
            <h3 className=" pt-3 ps-3" style={{ backgroundColor: "gray", textAlign: "center", padding: 9 }}>{category.charAt(0).toUpperCase() + category.slice(1) + " "}<Badge bg="danger"> News</Badge> </h3>
            <div className="search-status-container">
        {SearchQuery ? (
            <p className="searchResult">
                Showing {finalResult.length} results for: <strong>"{SearchQuery}" </strong>
            </p>
        ) : null}
    </div>
            {loading ? (
                <>
                    <LoadingCard />
                    <LoadingCard />
                    <LoadingCard />
                    <LoadingCard />
                    <LoadingCard />
                    <LoadingCard />
                    <LoadingCard />
                    <LoadingCard />
                    <LoadingCard />
                    <LoadingCard />
                    <LoadingCard />
                    <LoadingCard />

                </>
            ) : (

                
                finalResult.map((news) => <NewsCard key={news.link} news={news} />)
            )}
            {SearchQuery? "" :<div className="d-flex justify-content-center mb-3 mt-2" >
                <Button variant="success" onClick={handleGetNews} >Load More</Button>
            </div>

            }
            
        </Container>
        {/* <div className="d-flex justify-content-center" >
            <small style={{textAlign:"center"}}>Copyright &copy;2026 News-Today</small>
        </div> */}
        </>
    );
}