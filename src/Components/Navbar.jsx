import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form'
import { Badge, Button } from 'react-bootstrap';
import { useForm } from "react-hook-form"
import { use, useEffect, useState } from 'react';
import "../Style/SearchresultBox.css"
export default function NewsNavbar({ category, setCategory, resultjson,SetSearchQuery}) {

    const [searchResult, setsearchResult] = useState([])
    const [userInput, setuserinput] = useState("")
    const {
        register,
        handleSubmit,
        reset,
        clearErrors,
        watch,
        formState: { errors }
    } = useForm({
        defaultValues: {
            searchbox: "",
        },

        mode: "onSubmit",
        reValidateMode: "onSubmit"

    })
    let userinput = watch("searchbox")

    useEffect(() => {
        reset({ searchbox: "" }); // clear input on category change
        setsearchResult([]);      // clear search results
    }, [category,reset])


    useEffect(() => {
        if (userinput) {
            const filtered = resultjson.filter(item =>
                item.title.toLowerCase().includes(userinput.toLowerCase())
            );
            setsearchResult(filtered);
        }
        if (userinput == "") {
            setsearchResult([]);
            SetSearchQuery("");
        }
        // console.log(userinput)

    }, [userinput,SetSearchQuery])
    
    let onSubmit = (data) => {
        // console.log(data)
        // console.log(searchResult)
        
        SetSearchQuery(data.searchbox.trim())
        setsearchResult([]);
    }
    
    return (
        <>
        <Navbar expand="lg" className="bg-dark" data-bs-theme="dark" sticky='top'>
            <Container fluid>
                <Navbar.Brand  > <Button onClick={() => { setCategory("breaking") }} variant='warning'>News Today</Button></Navbar.Brand>
                <Navbar.Toggle aria-controls='navbarScroll' />
                <Navbar.Collapse id='navbarScroll' >
                    <Nav className='me-auto my-2 my-lg-0' style={{ maxHeight: "100px" }} navbarScroll>
                        {/* <Nav.Link onClick={()=>{setCategory("breaking")}} ><Badge bg="secondary">HOME</Badge></Nav.Link> */}
                        <Nav.Link onClick={() => { setCategory("breaking") }} ><Badge bg="secondary">Latest</Badge></Nav.Link>
                        <Nav.Link onClick={() => { setCategory("politics") }}><Badge bg="secondary">Politics</Badge></Nav.Link>
                        <Nav.Link onClick={() => { setCategory("business") }}><Badge bg="secondary">Economics</Badge></Nav.Link>
                        <Nav.Link onClick={() => { setCategory("sports") }}><Badge bg="secondary">Sports</Badge></Nav.Link>
                        <Nav.Link onClick={() => { setCategory("technology") }}><Badge bg="secondary">Technology</Badge></Nav.Link>
                    </Nav>
                    <Form className='d-flex' onSubmit={handleSubmit(onSubmit)}>
                        <div className="d-flex flex-column w-100 me-2">
                            <Form.Control
                                type='search'
                                placeholder='Search'
                                className='me-2'
                                aria-label='Search'

                                {...register("searchbox",
                                    {
                                        required: { value: true, message: "Search box is empty" },
                    
                                    
                                        onBlur: () => clearErrors("searchbox")

                                    })}
                                isInvalid={!!errors.searchbox}


                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors.searchbox?.message}

                            </Form.Control.Feedback>
                        </div>
                        <Button type='submit' variant='success' className='me-5'>Search</Button>

                    </Form>

                    {searchResult?.length > 0 &&  < div className=' SearchresultBox d-flex flex-column w-50 '>
                        {searchResult.map(result => (
                            <a
                                key={result.article_id}
                                href={result.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ textDecoration: "none" }}
                            >
                                <span className='Eachresult'>{result.title} </span>
                            </a>
                        ))}
                    </div>
                    }

                </Navbar.Collapse>
            </Container>
        </Navbar >
        
        </>
    );
}