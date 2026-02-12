import { useEffect, useState } from "react";
import { Badge, Button, Container } from "react-bootstrap";
import NewsCard from "./NewsCard";
import LoadingCard from "./LoadingCard";

export default function NewsBoard({ category ,setResultJson}) {

    let [result, setResults] = useState([])
    const [loading, setLoading] = useState(true);
    const [nextpage,setNextpage]=useState(null)

    async function getNews(append=false) {
        let er=false;
        let url=`https://newsdata.io/api/1/latest?apikey=${import.meta.env.VITE_NEWS_API_KEY}&category=${category}&country=bd&language=bn,en&timezone=asia/dhaka&removeduplicate=1&size=10`
        try {
            
            if (append && nextpage) {
                url += `&page=${nextpage}`;
            }
            setLoading(true)
            let rawnews = await fetch(url)


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
            {error?er=true:er=false}
        }finally{
           {er?setLoading(true):setLoading(false)} 
        }
    }

    useEffect(() => {
        setNextpage(null); 
        getNews(false)
        
    }, [category])

    let handleGetNews = () => {
        getNews(true)
        
    }

    return (
        
        <Container>
            <h3  className="mt-5 pt-3 ps-3" style={{ backgroundColor: "gray", textAlign: "center", padding: 9 }}>{category.charAt(0).toUpperCase()+category.slice(1)+" "}<Badge bg="danger"> News</Badge> </h3>
            {loading  ? (
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
                result.map((news) => <NewsCard key={news.link} news={news} />)
            )}

            <div className="d-flex justify-content-center mb-3 mt-2" >
                <Button variant="success" onClick={handleGetNews} >Load More</Button>
            </div>
        </Container>
        
    );
}