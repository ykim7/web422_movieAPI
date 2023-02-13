import Link from "next/link";
import Card from "react-bootstrap/Card";
import MovieDetails from "../components/MovieDetails";
import PageHeader from "../components/PageHeader";

export function getStaticProps() {
    return new Promise((resolve, reject) => {
        fetch(
            "https://friendly-gold-hem.cyclic.app/api/movies/573a139af29313caabcefb1d"
        )
            .then((res) => res.json())
            .then((data) => {
                resolve({ props: { movie: data } });
            });
    });
}

export default function About(props) {
    return (
        <>
            <PageHeader text="About the Developer" />
            <Card>
                <Card.Body>
                    <p>This movie is my favorite movie, </p>
                    <Link href={"/movies/" + props.movie.title}>Titanic</Link>
                </Card.Body>
                <MovieDetails movie={props.movie} />
            </Card>
        </>
    );
}
