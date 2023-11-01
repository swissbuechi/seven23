/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import moment from "moment";
import countryFlagEmoji from "country-flag-emoji";
import React, { useState, useEffect } from "react";

import {
  Router,
  Route,
  Redirect,
  Routes,
  useParams,
  useLocation,
  useNavigate
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";

import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";

import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LoopIcon from "@mui/icons-material/Loop";
import Tooltip from "@mui/material/Tooltip";

import TransactionForm from "./transactions/TransactionForm";

import TripDetails from "./nomadlist/TripDetails";
import CityDetails from "./nomadlist/CityDetails";
import CountryDetails from "./nomadlist/CountryDetails";

import StatisticsActions from "../actions/StatisticsActions";
import UserActions from "../actions/UserActions";

import useRouteTitle from "../hooks/useRouteTitle";

import LayoutSideListPanel from "./layout/LayoutSideListPanel";

import './Nomadlist.scss';

export default function Nomadlist(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const titleObject = useRouteTitle();

  const account = useSelector(state => state.account);
  const nomadlist = useSelector(state =>
    state.user.socialNetworks ? state.user.socialNetworks.nomadlist || {} : {}
  );

  const [isLoading, setIsLoading] = useState(true);
  const [selectedTrip, setSelectedTrip] = useState(null);

  const trips = nomadlist ? nomadlist.data.trips : null;

  let currentview = "trips"; // Default View to display on icon click

  if (location.pathname.startsWith("/nomadlist/trip/")) {
    currentview = "trips";
  }
  if (location.pathname.startsWith("/nomadlist/city/")) {
    currentview = "cities";
  }
  if (location.pathname.startsWith("/nomadlist/country/")) {
    currentview = "countries";
  }

  // Define which GroupButton is selected
  const [viewList, setViewList] = useState(currentview);
  const [statistics, setStatistic] = useState(null);

  const isSyncing = useSelector(
    state => state.state.isSyncing || state.state.isLoading
  );

  const transactions = useSelector(state => state.transactions);

  // We generate list of citiyes and trips base don StatisticsActions.nomadlist 👍
  useEffect(() => {
    if (!isSyncing && nomadlist && transactions) {
      if (!statistics) {
        setIsLoading(true);
        setTimeout(() => {
          dispatch(StatisticsActions.nomadlist())
            .then(result => {
              result.cities.sort((a, b) => {
                if (a.trips.length < b.trips.length) {
                  return 1;
                } else {
                  return -1;
                }
              });

              result.countries.sort((a, b) => {
                if (a.trips.length < b.trips.length) {
                  return 1;
                } else {
                  return -1;
                }
              });

              setStatistic(result);
              setIsLoading(false);
            })
            .catch(exception => {
              console.error(exception);
            });
        }, 10);
      }
    }
  }, [nomadlist, isSyncing]);

  // TODO : Refactor, dirty code to match sidebar with route id
  useEffect(() => {
    if (location.pathname.startsWith("/nomadlist/trip/")) {
      const id = location.pathname.replace("/nomadlist/trip/", "");
      if (id) {
        setSelectedTrip(id);
      } else {
        setSelectedTrip(null);
      }
    } else if (location.pathname == "/nomadlist") {
      setSelectedTrip(null);
    }
  }, [location.pathname]);

  // Refresh data from nomadlist
  const [isRefreshing, setIsRefreshing] = useState(false);
  const refreshNomadlist = () => {
    setIsRefreshing(true);
    dispatch(UserActions.updateNomadlist())
      .then(() => {
        setIsRefreshing(false);
      })
      .catch(exception => {
        styleetIsRefreshing(false);
        console.error(exception);
      });
  };

  return (
    <LayoutSideListPanel
      sidePanel={
        <div style={{ postion: "relative" }}>

          {isLoading &&
            <List>
              {[
                "w120",
                "w150",
                "w120",
                "w120",
                "w120",
                "w150",
                "w120",
                "w120"
              ].map((value, i) => {
                return (
                  <ListItem button key={i} disabled={true}>
                    <ListItemText
                      primary={<span className={`loading ${value}`} />}
                      secondary={<span className="loading w50" />}
                    />
                    <KeyboardArrowRight />
                  </ListItem>
                );
              })}
            </List>
          }

          {!isLoading && viewList == "trips" && trips &&
            <div>
              {!trips.length ?
                <div className="emptyContainer">
                  <p>No trips</p>
                </div>
              :
                <List
                  className=" wrapperMobile"
                  style={{ paddingBottom: 70 }}
                  subheader={
                    <ListSubheader disableSticky component="div">
                      Your trips ({trips.length})
                    </ListSubheader>
                  }
                >
                  { trips.map((trip, i) => {
                    return (
                      <ListItem
                        button
                        key={i}
                        selected={
                          location.pathname == `/nomadlist/trip/${i + 1}`
                        }
                        onClick={event => {
                          navigate("/nomadlist/trip/" + (i + 1));
                        }}
                      >
                        <ListItemText
                          primary={`${trip.place} - ${
                            countryFlagEmoji.get(trip.country_code)
                              ? countryFlagEmoji.get(trip.country_code)
                                  .emoji
                              : ""
                          } ${trip.country}`}
                          secondary={`${moment(trip.date_start).format(
                            "LL"
                          )}, ${trip.length}`}
                        />
                        <KeyboardArrowRight />
                      </ListItem>
                    );
                  })}
                </List>
              }
            </div>
          }

          {!isLoading && viewList == "cities" && statistics?.cities &&
            <div>
              { !statistics.cities.length ?
                <div className="emptyContainer">
                  <p>No cities</p>
                </div>
              :
                <List
                  className=" wrapperMobile"
                  style={{ paddingBottom: 70 }}
                  subheader={
                    <ListSubheader disableSticky component="div">
                      Your cities ({statistics.cities.length})
                    </ListSubheader>
                  }
                >
                  {statistics.cities.map((city, i) => {
                    return (
                      <ListItem
                        button
                        key={i}
                        disabled={!city.place_slug}
                        selected={
                          location.pathname ==
                          `/nomadlist/city/${city.place_slug}`
                        }
                        onClick={event => {
                          navigate(
                            `/nomadlist/city/${city.place_slug}`
                          );
                        }}
                      >
                        <ListItemText
                          primary={`${city.place} - ${
                            countryFlagEmoji.get(city.country_code)
                              ? countryFlagEmoji.get(city.country_code)
                                  .emoji
                              : ""
                          } ${city.country}`}
                          secondary={`${city.trips.length} trips, ${city.stay} days, ${city.transactions_length} transactions`}
                        />
                        <KeyboardArrowRight />
                      </ListItem>
                    );
                  })}
                </List>
              }
            </div>
          }
          {!isLoading && viewList == "countries" && statistics?.countries &&
            <div>
              { statistics.countries.length == 0 ?
                <div className="emptyContainer">
                  <p>No countries</p>
                </div>
              :
                <List
                  className=" wrapperMobile"
                  style={{ paddingBottom: 70 }}
                  subheader={
                    <ListSubheader disableSticky component="div">
                      Your countries ({statistics.countries.length})
                    </ListSubheader>
                  }
                >
                  {statistics.countries.map((country, i) => {
                    return (
                      <ListItem
                        button
                        key={i}
                        selected={
                          location.pathname ==
                          `/nomadlist/country/${country.country_slug}`
                        }
                        onClick={event => {
                          navigate(
                            `/nomadlist/country/${country.country_slug}`
                          );
                        }}
                      >
                        <ListItemText
                          primary={`${
                            countryFlagEmoji.get(country.country_code)
                              ? countryFlagEmoji.get(country.country_code)
                                  .emoji
                              : ""
                          } ${country.country}`}
                          secondary={`${country.trips.length} trips, ${country.stay} days, ${country.transactions_length} transactions`}
                        />
                        <KeyboardArrowRight />
                      </ListItem>
                    );
                  })}
                </List>
              }
            </div>
          }
        </div>
      }>

      <Box className="nomadListHeader">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <List
            subheader={
              <ListSubheader disableSticky component="div">
                Nomadlist @{nomadlist.username}
              </ListSubheader>
            }
          ></List>
          { account.isLocal && (
            <Tooltip title="Refresh nomadlist profile" aria-label="add">
              <IconButton
                size="small"
                disabled={isRefreshing}
                style={{ marginRight: 15, marginBottom: 6 }}
                onClick={refreshNomadlist}
              >
                <LoopIcon
                  className={
                    isRefreshing
                      ? "syncingAnimation"
                      : "syncingAnimation stop"
                  }
                />
              </IconButton>
            </Tooltip>
          )}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ButtonGroup
            disabled={isLoading}
            color="primary"
            size="small"
            aria-label="small outlined button group"
          >
            <Button
              variant={
                !isLoading && viewList == "trips"
                  ? "contained"
                  : "outlined"
              }
              onClick={() => setViewList("trips")}
            >
              Trips
            </Button>
            <Button
              variant={
                !isLoading && viewList == "cities"
                  ? "contained"
                  : "outlined"
              }
              onClick={() => setViewList("cities")}
            >
              Cities
            </Button>
            <Button
              variant={
                !isLoading && viewList == "countries"
                  ? "contained"
                  : "outlined"
              }
              onClick={() => setViewList("countries")}
            >
              Countries
            </Button>
          </ButtonGroup>
        </div>
      </Box>
    </LayoutSideListPanel>
  );
}