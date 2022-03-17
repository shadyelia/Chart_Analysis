import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { ISchoolDetails } from "../Interfaces/ISchoolData";
import FlagIcon from "@mui/icons-material/Flag";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import SchoolIcon from "@mui/icons-material/School";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PlayLessonIcon from "@mui/icons-material/PlayLesson";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

import { NavLink } from "react-router-dom";

export function SchoolsDetails() {
    const dispatch = useAppDispatch();
    const schoolDetails: ISchoolDetails = useAppSelector(
        (state) => state.schools.selectedSchoolDetails
    );

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image="https://media.gettyimages.com/photos/red-brick-high-school-building-exterior-picture-id171306436?s=612x612"
            />
            <CardContent>
                <div>
                    <FlagIcon /> Country : {schoolDetails.country}
                </div>
                <div>
                    <HolidayVillageIcon /> Camp : {schoolDetails.camp}
                </div>
                <div>
                    <SchoolIcon /> School : {schoolDetails.school}
                </div>
                <div>
                    <CalendarMonthIcon /> Month : {schoolDetails.month}
                </div>
                <div>
                    <PlayLessonIcon /> Lessons : {schoolDetails.lessons}
                </div>
            </CardContent>
            <CardActions>
                <Button size="small">
                    <NavLink to="/home">Back</NavLink>
                </Button>
            </CardActions>
        </Card>
    );
}
