import React, {useEffect} from 'react';
import {Container, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "app/store";
import {getPacksTC, packsActions} from "./packsSlice";
import PacksTable from "./table/PacksTable";
import {useDebounce} from "use-debounce";
import {parseInt} from "lodash";
import {useSearchParams} from "react-router-dom";
import {AddNewPackModal} from "features/packs/modals/addNewPackModal";
import Paginator from "common/components/paginator/Paginator";
import SearchAndFilterBlock from "common/components/searchAndFilterBlock/SearchAndFilterBlock";


const Packs = () => {

        const dispatch = useAppDispatch()


        const queryParams = useAppSelector(state => state.packs.params)
        const totalPacksCount = useAppSelector(state => state.packs.cardPacksTotalCount)
        const packsPageSize = useAppSelector(state => state.packs.params.pageCount)

        const debouncedQueryParams = useDebounce(queryParams, 650)[0]

        const [searchParams, setSearchParams] = useSearchParams()

        const handleChangePage = (
            event: React.MouseEvent<HTMLButtonElement> | null,
            newPage: number,
        ) => {
            dispatch(packsActions.setParams({page: newPage}))
        }
        const handleChangeRowsPerPage = (
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        ) => {
            dispatch(packsActions.setParams({pageCount: parseInt(event.target.value), page: 0}))
        }

        const params: { [key: string]: string } = {}
        searchParams.forEach((value, key) => {
            params[key] = value
        })


        useEffect(() => {
            dispatch(packsActions.setParams(params))
        }, [])

        useEffect(() => {
            setSearchParams({
                packName: queryParams.packName,
                min: String(queryParams.min),
                max: String(queryParams.max),
                sortPacks: queryParams.sortPacks,
                page: String(queryParams.page),
                pageCount: String(queryParams.pageCount),
                user_id: queryParams.user_id,
            })
        }, [queryParams])

        useEffect(() => {
            dispatch(getPacksTC())
        }, [
            debouncedQueryParams.min,
            debouncedQueryParams.max,
            debouncedQueryParams.user_id,
            debouncedQueryParams.sortPacks,
            debouncedQueryParams.page
        ])


        return (
            <Container style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <Typography component={'span'} variant={"h4"}>
                        Pack list
                    </Typography>
                    <AddNewPackModal/>
                </div>
                <SearchAndFilterBlock/>
                <Paginator dispatch={dispatch} totalItemsCount={totalPacksCount} pageSize={packsPageSize}
                           page={queryParams.page} handleChangePage={handleChangePage}
                           handleChangeRowsPerPage={handleChangeRowsPerPage}/>
                <PacksTable/>
                {totalPacksCount === 0 &&
                    <Typography>
                        No packs found, try to change filter parameters
                    </Typography>}
            </Container>
        );
    }
;

export default Packs;