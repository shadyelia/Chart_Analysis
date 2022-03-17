import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { ISchoolData } from "../Interfaces/ISchoolData";
import {
    getDataAsync,
    setCountry,
    setCamp,
    setSchool,
    setSchoolDetails,
    getSelectedCountry,
    getSelectedCamp,
    getSelectedSchool,
} from "../schoolStore/schoolsSlice";
import CircularProgress from "@mui/material/CircularProgress";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export function SchoolsData() {
    const dispatch = useAppDispatch();
    const postStatus = useAppSelector((state) => state.schools.status);
    const mainData = useAppSelector(
        (state) => state.schools.filteredSchools
    );
    const countries = useAppSelector((state) => state.schools.countries);
    const [selectedCountry, setSelectedCountry] = useState(
        useAppSelector(getSelectedCountry)
    );
    const handleSetSelectedCountry = (e: any) => {
        setSelectedCountry(e.target.value);
        dispatch(setCountry(e.target.value));
    };

    const camps = useAppSelector((state) => state.schools.camps);
    const [selectedCamp, setSelectedCamp] = useState(
        useAppSelector(getSelectedCamp)
    );
    const handleSetSelectedCamp = (e: any) => {
        setSelectedCamp(e.target.value);
        dispatch(setCamp(e.target.value));
    };

    const schools = useAppSelector((state) => state.schools.schools);
    const [selectedSchool, setSelectedSchool] = useState(
        useAppSelector(getSelectedSchool)
    );
    const handleSetSelectedSchool = (e: any) => {
        setSelectedSchool(e.target.value);
        dispatch(setSchool(e.target.value));
    };

    useEffect(() => {
        if (postStatus === "idle") {
            dispatch(getDataAsync());
        } else if (postStatus === "succeeded") {
            if (selectedCountry == "") setSelectedCountry(countries[0]);
            if (selectedCamp == "") setSelectedCamp(camps[0]);
            if (selectedSchool == "") setSelectedSchool(schools[0]);
        }
    }, [postStatus, dispatch]);

    return (
        <div>
            {postStatus === "loading" && <CircularProgress />}
            {postStatus === "succeeded" && (
                <div>
                    <FormControl sx={{ m: 1, minWidth: 200 }}>
                        <InputLabel id="demo-simple-select-label">
                            Select Country
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedCountry}
                            label="country"
                            onChange={handleSetSelectedCountry}
                        >
                            {countries.map((country: string) => {
                                return (
                                    <MenuItem value={country} key={country}>
                                        {country}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>

                    <FormControl sx={{ m: 1, minWidth: 200 }}>
                        <InputLabel id="demo-simple-select-label">Select Camp</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedCamp}
                            label="country"
                            onChange={handleSetSelectedCamp}
                        >
                            {camps.map((camp: string) => {
                                return (
                                    <MenuItem value={camp} key={camp}>
                                        {camp}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>

                    <FormControl sx={{ m: 1, minWidth: 200 }}>
                        <InputLabel id="demo-simple-select-label">Select School</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedSchool}
                            label="country"
                            onChange={handleSetSelectedSchool}
                        >
                            {schools.map((school: string) => {
                                return (
                                    <MenuItem value={school} key={school}>
                                        {school}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>


                    <span>{mainData.totallessons}</span>
                </div>

            )}
        </div>
    );
}
