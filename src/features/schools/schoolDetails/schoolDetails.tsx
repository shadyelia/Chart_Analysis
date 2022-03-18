import React, { useEffect } from "react";
import { useAppSelector } from "../../../app/hooks";
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
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import "./schoolDetails.css";
import { useTranslation } from "react-i18next";

export function SchoolsDetails() {
    const { t, i18n } = useTranslation();
    const schoolDetails: ISchoolDetails = useAppSelector(
        (state) => state.schools.selectedSchoolDetails
    );
    const handleClick = () => {
        navigate("/home", { replace: true });
    };
    const navigate = useNavigate();
    useEffect(() => {
        if (schoolDetails === undefined) {
            navigate("/home", { replace: true });
        }
    }, []);

    return (
        <Grid
            item
            xs={3}
            container
            direction="column"
            alignItems="center"
            className="centerCard"
        >
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="140"
                    image="https://media.gettyimages.com/photos/red-brick-high-school-building-exterior-picture-id171306436?s=612x612"
                />
                <CardContent>
                    <div>
                        <FlagIcon /> {t("COUNTRY")} : {schoolDetails.country}
                    </div>
                    <div>
                        <HolidayVillageIcon /> {t("CAMP")} : {schoolDetails.camp}
                    </div>
                    <div>
                        <SchoolIcon /> {t("SCHOOL")} : {schoolDetails.school}
                    </div>
                    <div>
                        <CalendarMonthIcon /> {t("MONTH")} : {schoolDetails.month}
                    </div>
                    <div>
                        <PlayLessonIcon /> {t("LESSONS")} : {schoolDetails.lessons}
                    </div>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={handleClick}>
                        {t("BACK")}
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
}
