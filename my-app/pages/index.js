/*********************************************************************************
 *  WEB422 – Assignment 3
 *  I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 *  No part of this assignment has been copied manually or electronically from any other source
 *  (including web sites) or distributed to other students.
 *
 *  Name: Yujin Kim  Student ID: 117826214  Date: February 12, 2023
 *
 *
 ********************************************************************************/

import useSWR from "swr";
import { useState, useEffect } from "react";
import { Pagination, Accordion } from "react-bootstrap";
import MovieDetails from "../components/MovieDetails";
import PageHeader from "../components/PageHeader";
import Container from "react-bootstrap/Container";

export default function Home() {
    const [page, setPage] = useState(1);
    const [pageData, setPageData] = useState([]);
    const { data, error } = useSWR(
        `https://friendly-gold-hem.cyclic.app/api/movies?page=${page}&perPage=10`
    );

    useEffect(() => {
        if (data) {
            setPageData(data);
        }
    }, [data]);

    function previous() {
        if (page > 1) setPage(page - 1);
    }
    function next() {
        setPage(page + 1);
    }
    return (
        <>
            <PageHeader text="Film Collection : Sorted by Date" />
            <Container>
                <Accordion defaultActiveKey="0">
                    {pageData.map((movie) => {
                        return (
                            <Accordion.Item
                                eventKey={movie._id}
                                key={movie._id}
                            >
                                <Accordion.Header>
                                    <b> {movie.title} </b>&nbsp;({movie.year}{" "}
                                    {movie.directors.join(", ")})
                                </Accordion.Header>
                                <Accordion.Body>
                                    <MovieDetails movie={movie} />
                                </Accordion.Body>
                            </Accordion.Item>
                        );
                    })}
                </Accordion>
                <br />
                <Pagination>
                    <Pagination.Prev onClick={previous} />
                    <Pagination.Item>{page}</Pagination.Item>
                    <Pagination.Next onClick={next} />
                </Pagination>
            </Container>
        </>
    );
}
