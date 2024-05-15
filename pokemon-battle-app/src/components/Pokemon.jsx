import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { yellow } from "@mui/material/colors";
export default function Pokemon(props) {
    return (
        <Card sx={{ maxWidth: 345, bgcolor: yellow[200] }}>
            <CardMedia
                sx={{ height: 140 }}
                image={props.sprites.front_default}
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.name}
                </Typography>
                <Typography variant="body3" color="text.secondary">
                    <p>Height: {props.height}</p>
                    <p>Weight: {props.weight}</p>
                    <p>Base Experience: {props.base_experience}</p>
                    <p>
                        Abilities:{" "}
                        {props.abilities.map((ability) => ability.ability.name).join(", ")}
                    </p>
                    <p>Types: {props.types.map((type) => type.type.name).join(", ")}</p>
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}