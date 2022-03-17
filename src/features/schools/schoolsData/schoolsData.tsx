import React, { useEffect, useState } from "react";
import "./schoolData.css";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { IChartData, ISchoolDetails } from "../Interfaces/ISchoolData";
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
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import * as Utils from "../../../common/utils";
import { Line } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export function SchoolsData() {
    const dispatch = useAppDispatch();
    const postStatus = useAppSelector((state) => state.schools.status);
    const filteredData = useAppSelector((state) => state.schools.filteredSchools);
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

    const labels = Utils.months({ count: 12 });
    const initchartData: any = {
        labels: labels,
        datasets: [],
    };
    const [chartData, setChartData] = useState(initchartData);
    const handleAddDataToDataSet = (schoolName: string, data: any = null) => {
        if (data == null) data = [...chartDataSets];
        if (schoolName != null) {
            let schoolChartData: IChartData = data.find(
                (item: any) => item.school == schoolName
            );
            if (schoolChartData != undefined && schoolChartData.checked == false) {
                let dataSet: any = {
                    label: schoolChartData?.school,
                    data: schoolChartData?.lessons,
                    borderColor: schoolChartData?.color,
                };
                setChartData({
                    ...chartData,
                    datasets: [...chartData.datasets, dataSet],
                });
                if (schoolChartData != undefined) schoolChartData.checked = true;
                setChartDataSets(data);
            } else {
                let dataSets: any[] = [...chartData.datasets];
                dataSets.splice(
                    dataSets.findIndex((item: any) => item.label === schoolName),
                    1
                );
                setChartData({
                    ...chartData,
                    datasets: dataSets,
                });
                if (schoolChartData != undefined) schoolChartData.checked = false;
                setChartDataSets(data);
            }
        }
    };

    var initchartDataSets: IChartData[] = [];
    const [chartDataSets, setChartDataSets] = useState(initchartDataSets);
    const handleSetChartDataSets = () => {
        let data: IChartData[] = [];
        for (let i = 1; i < schools.length; i++) {
            let currentData: IChartData = {} as IChartData;
            currentData.id = Math.random() * 1000;
            currentData.color =
                Utils.CHART_COLORS_Array[i % Utils.CHART_COLORS_Array.length];
            currentData.school = schools[i];
            currentData.totalLessons = 0;
            currentData.checked = false;
            currentData.lessons = Array(12).fill(0);
            filteredData.schools
                .filter((item) => item.school == schools[i])
                .forEach((elem) => {
                    let monthIndex: number = Utils.MONTHS.indexOf(elem.month);
                    if (monthIndex != -1) currentData.lessons[monthIndex] = elem.lessons;
                    currentData.totalLessons += elem.lessons;
                });
            data.push(currentData);
        }
        //setChartDataSets(data);
        handleAddDataToDataSet(schools[1], data);
    };

    const navigate = useNavigate();
    const lineOptions: any = {
        onClick: (e: any, element: any) => {
            if (element.length > 0) {
                var dataSetIndex = element[0].datasetIndex;
                if (dataSetIndex >= 0) {
                    var schoolData: IChartData = { ...chartDataSets[dataSetIndex] };
                    if (schoolData != undefined) {
                        var fullSchoolData: any = {
                            ...filteredData.schools.find(
                                (item) => item.school == schoolData.school
                            ),
                        };
                        dispatch(setSchoolDetails(fullSchoolData));
                        navigate("/schoolDetails", { replace: true });
                    }
                }
            }
        },
    };

    useEffect(() => {
        if (postStatus === "idle") {
            dispatch(getDataAsync());
        } else if (postStatus === "succeeded") {
            if (selectedCountry == "") setSelectedCountry(countries[0]);
            if (selectedCamp == "") setSelectedCamp(camps[0]);
            if (selectedSchool == "") setSelectedSchool(schools[0]);
            if (chartDataSets.length == 0) handleSetChartDataSets();
        }
    }, [postStatus, dispatch]);

    return (
        <div>
            {postStatus === "loading" && <CircularProgress />}
            {postStatus === "succeeded" && (
                <div>
                    <h3 className="coloredH3">Number of Lessons</h3>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <div className="form-inline">
                                <span>Select Country</span>
                                <FormControl sx={{ m: 1, minWidth: 200 }}>
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
                            </div>
                        </Grid>

                        <Grid item xs={4}>
                            <div className="form-inline">
                                <span>Select Camp</span>
                                <FormControl sx={{ m: 1, minWidth: 200 }}>
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
                            </div>
                        </Grid>

                        <Grid item xs>
                            <div className="form-inline">
                                <span>Select School</span>
                                <FormControl sx={{ m: 1, minWidth: 200 }}>
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
                            </div>
                        </Grid>
                    </Grid>

                    <Card sx={{ maxWidth: 1600 }}>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={8}>
                                    <Line
                                        datasetIdKey="id"
                                        data={chartData}
                                        options={lineOptions}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    {selectedSchool == "All" && (
                                        <span>
                                            {filteredData.totallessons} in {selectedCamp}{" "}
                                        </span>
                                    )}
                                    {selectedSchool != "All" && (
                                        <span>
                                            {filteredData.totallessons} in {selectedSchool}{" "}
                                        </span>
                                    )}
                                    {chartDataSets &&
                                        chartDataSets.length > 0 &&
                                        chartDataSets.map((item) => {
                                            return (
                                                <div
                                                    className={!item.checked ? "unChecked" : ""}
                                                    key={item.id}
                                                    style={{ color: item.color }}
                                                >
                                                    <Checkbox
                                                        checked={item.checked}
                                                        onChange={(e) => {
                                                            handleAddDataToDataSet(e.target.value);
                                                        }}
                                                        value={item.school}
                                                        inputProps={{ "aria-label": "controlled" }}
                                                    />
                                                    {item.totalLessons} in {item.school}
                                                </div>
                                            );
                                        })}
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
