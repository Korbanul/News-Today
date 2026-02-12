import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import '../Style/NewsCard.css'

function LoadingCard() {
    return (
        <Card lassName="mb-3 w-100">
            <Row className="g-0">  {/*“Set the gutter (space between columns) to zero.” */}
                <Col className='md-4'>
                    <Card.Img
                        src="/NewsCardAltImg.jpg"
                        className="maxHeight"

                    />
                </Col>

                <Col className='md-8'>
                    <Card.Body>
                        <Placeholder as={Card.Title} animation='glow'>
                            <Placeholder xs={8} />                        {/* xs=8 means 8 column It creates a gray loading bar that looks like real content while data is loading. */}
                        </Placeholder>

                        <Placeholder as={Card.Text} animation='glow'>
                            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                            <Placeholder xs={6} /> <Placeholder xs={8} />
                        </Placeholder>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
}

export default LoadingCard;