import { styled, alpha, InputBase, Select, MenuItem, Box, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import SearchDialog from "./SearchDialog";
import axios from "../requests/news/axios";
import requests from "../requests/news/requests";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    flex: 1,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: "white"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%'
    },
}));

const SearchBar = () => {
    const [search, setSearch] = useState("")
    const [sortby, setSortby] = useState("publishedAt");

    const [open, setOpen] = useState(false);
    const [news, setNews] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        const request = await axios.get(requests.fetchQueried(search, sortby));
        setNews(request.data.articles);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <Box component="form" onSubmit={handleSearch} sx={{ display: "flex", justifyContent: "space-between", flex: 1 }}>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Select
                    id="demo-simple-select-autowidth"
                    value={sortby}
                    onChange={(e) => setSortby(e.target.value)}
                    label="Sort By"
                    autoWidth
                    sx={{
                        color: "white",
                        ".css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": {
                            padding: 1
                        },
                        ".MuiOutlinedInput-notchedOutline": {
                            border: "none"
                        }
                    }}
                >
                    <MenuItem value="relevancy">Relevancy</MenuItem>
                    <MenuItem value="popularity">Popularity</MenuItem>
                    <MenuItem value="publishedAt">Published At</MenuItem>
                </Select>
                <IconButton type="submit" disabled={search === ""}>
                    <SearchIcon />
                </IconButton>
            </Box>
            <SearchDialog open={open} handleClose={handleClose} query={search} news={news} />
        </Search>
    );
}

export default SearchBar;