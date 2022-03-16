import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { ISchoolData } from "../Interfaces/ISchoolData";
import {
    getDataAsync,
    putSchool,
    selectCamp,
    selectCountry,
    selectSchool,
    selectData,
} from "../schoolStore/schoolsSlice";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export function SchoolsData() {
    const dispatch = useAppDispatch();
    const postStatus = useAppSelector((state) => state.schools.status);
    const data = useAppSelector((state) => state.schools.filteredSchools.schools);
    useEffect(() => {
        if (postStatus === "idle") {
            dispatch(getDataAsync());
        }
    }, [postStatus, dispatch]);

    return (
        <div>
            {postStatus === "loading" && (
                <Box sx={{ display: "flex" }}>
                    <CircularProgress />
                </Box>
            )}
            {postStatus === "succeeded" && <div>{data.length}</div>}
        </div>
    );
}
