import Logout from './components/Logout';

import Home from './components/Content/Home/Home';

import Berkas from './components/Content/Berkas/Main';
import BerkasAdd from './components/Content/Berkas/Add';
import BerkasPreview from './components/Content/Berkas/Preview';

import Pansel from './components/Content/Pansel/Main';

import Formasi from './components/Content/Formasi/Main';
import FormasiAdd from './components/Content/Formasi/Add';
import FormasiEdit from './components/Content/Formasi/Edit';
import Kontak from './components/Content/Kontak/Main';
import Tahapan from './components/Content/Tahapan/Main';
import TahapanAdd from './components/Content/Tahapan/Add';
import TahapanEdit from './components/Content/Tahapan/Edit';

import Jadwal from './components/Content/Jadwal/Main';
import JadwalAdd from './components/Content/Jadwal/Add';
import JadwalPreview from './components/Content/Jadwal/Preview';
import JadwalEdit from './components/Content/Jadwal/Edit';

import Pengumuman from './components/Content/Pengumuman/Main';
import PengumumanAdd from './components/Content/Pengumuman/Add';
import PengumumanPreview from './components/Content/Pengumuman/Preview';
import PengumumanEdit from './components/Content/Pengumuman/Edit';

import Pelamar from './components/Content/Pelamar/Main';
import PelamarView from './components/Content/Pelamar/FinalisasiView';

import Akun from './components/Content/Akun/Main';
import AkunAdd from './components/Content/Akun/Add';
import AkunEdit from './components/Content/Akun/Edit';
import AkunView from './components/Content/Akun/FinalisasiView';

import {Switch, Route } from "react-router-dom";

export default function MenuRouting() {
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
           
            <Route path="/pelamar/view/:dataId">
                <PelamarView />
            </Route>
            <Route path="/pelamar">
                <Pelamar />
            </Route>

            <Route path="/akun/add">
                <AkunAdd />
            </Route>
            <Route path="/akun/edit/:dataId">
                <AkunEdit />
            </Route>
            <Route path="/akun/view/:dataId">
                <AkunView />
            </Route>
            <Route path="/akun">
                <Akun />
            </Route>
            <Route path="/formasi/add">
                <FormasiAdd />
            </Route>
            <Route path="/formasi/edit/:dataId">
                <FormasiEdit />
            </Route>
            <Route path="/formasi">
                <Formasi />
            </Route>
            <Route path="/pansel">
                <Pansel />
            </Route>
            <Route path="/jadwal/add">
                <JadwalAdd />
            </Route>
            <Route path="/jadwal/preview/:dataId">
                <JadwalPreview />
            </Route>
            <Route path="/jadwal/edit/:dataId">
                <JadwalEdit />
            </Route>
            <Route path="/jadwal">
                <Jadwal />
            </Route>

            <Route path="/tahapan/add">
                <TahapanAdd />
            </Route>
            <Route path="/tahapan/edit/:dataId">
                <TahapanEdit />
            </Route>
            <Route path="/tahapan">
                <Tahapan />
            </Route>

            <Route path="/berkas/add">
                <BerkasAdd />
            </Route>
            <Route path="/berkas/preview/:dataId">
                <BerkasPreview />
            </Route>
            <Route path="/berkas">
                <Berkas />
            </Route>

            <Route path="/pengumuman/add">
                <PengumumanAdd />
            </Route>
            <Route path="/pengumuman/edit/:dataId">
                <PengumumanEdit />
            </Route>
            <Route path="/pengumuman/preview/:dataId">
                <PengumumanPreview />
            </Route>
            <Route path="/pengumuman">
                <Pengumuman />
            </Route>


            
            {
            /*
            //analytics
            //users
            //logs
            */
            }
            <Route path="/logout">
                <Logout />
            </Route>
        </Switch>
    )
}