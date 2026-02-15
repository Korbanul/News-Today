import { Button, Card, Col, Container, Placeholder, Row } from "react-bootstrap";
import '../Style/NewsCard.css'
export default function ({ news }) {
    return (
        <Card className="mb-3 w-100 CardBox">
            <Row className="g-0">
                {/* LEFT IMAGE */}
                <Col md={4}>
                    <Card.Img
                        src={news.image_url ? news.image_url : "Newscardaltimg.jpg"}
                        onError={(e) => {
                            e.target.onerror = null; // prevent infinite loop
                            e.target.src = "Newscardaltimg.jpg";
                        }} className="maxHeight"
                    />
                </Col>

                {/* RIGHT CONTENT */}
                <Col md={8} >
                    <Card.Body >
                        <Card.Title>{news.title}</Card.Title>
                        <Card.Text>{news.description ? news.description.slice(0, 150) : "No description available for this news article"}......</Card.Text>
                        <div className="mt-5">
                            <small className="text-muted " >
                                {news.fetched_at}
                            </small>
                            <small className="text-muted ms-3" >

                                {news.source_name}
                            </small>
                            <a href={news.link} target="_blank"><Button variant="outline-primary" className="ms-3 " size="sm">Read More</Button></a>
                        </div>
                    </Card.Body>
                </Col>
            </Row>
        </Card>


    );
}