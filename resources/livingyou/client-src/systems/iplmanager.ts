import * as alt from 'alt-client';
import * as native from 'natives';

export default class IPLManager {
    static initializeDefaultIPLs(): void {
        alt.requestIpl('post_hiest_unload'); // Heist Jewel
        alt.requestIpl('refit_unload'); // Max Renda
        alt.requestIpl('finbank'); // Heist Union Depository
        alt.requestIpl('coroner_int_on'); // Morgue
        alt.requestIpl('coronertrash'); // Morgue
        alt.requestIpl('cs1_02_cf_onmission1'); // Cluckin Bell
        alt.requestIpl('cs1_02_cf_onmission2'); // Cluckin Bell
        alt.requestIpl('cs1_02_cf_onmission3'); // Cluckin Bell
        alt.requestIpl('cs1_02_cf_onmission4'); // Cluckin Bell
        alt.requestIpl('farm'); // Grapeseed's farm
        alt.requestIpl('farmint'); // Grapeseed's farm
        alt.requestIpl('farm_lod'); // Grapeseed's farm
        alt.requestIpl('farm_props'); // Grapeseed's farm
        alt.requestIpl('des_farmhouse'); // Grapeseed's farm
        alt.requestIpl('fiblobby'); // FIB lobby
        alt.requestIpl('atriumglmission'); // FIB Roof
        alt.removeIpl('dt1_05_hc_end'); // FIB Fountain
        alt.removeIpl('dt1_05_hc_req'); // FIB Fountain
        alt.requestIpl('dt1_05_hc_remove'); // FIB Fountain
        alt.requestIpl('fruitbb'); // Billboard: iFruit
        alt.requestIpl('sc1_01_newbill'); // Billboard: iFruit
        alt.requestIpl('hw1_02_newbill'); // Billboard: iFruit
        alt.requestIpl('hw1_emissive_newbill'); // Billboard: iFruit
        alt.requestIpl('sc1_14_newbill'); // Billboard: iFruit
        alt.requestIpl('dt1_17_newbill'); // Billboard: iFruit
        alt.requestIpl('id2_14_during_door'); // Lester's factory
        alt.requestIpl('id2_14_during1'); // Lester's factory
        alt.requestIpl('facelobby'); // Life Invader lobby
        alt.requestIpl('v_tunnel_hole'); // Tunnels
        alt.requestIpl('carwash_with_spinners'); // Carwash
        alt.requestIpl('sp1_10_real_interior'); // Stadium "Fame or Shame"
        alt.requestIpl('sp1_10_real_interior_lod'); // Stadium "Fame or Shame"
        alt.requestIpl('ch1_02_open'); // House in Banham Canyon
        alt.requestIpl('bkr_bi_id1_23_door'); // Garage in La Mesa (autoshop)
        alt.requestIpl('lr_cs6_08_grave_closed'); // Hill Valley church - Grave
        alt.requestIpl('methtrailer_grp1'); // Lost's trailer park
        alt.requestIpl('bkr_bi_hw1_13_int'); // Lost safehouse
        alt.requestIpl('canyonrvrshallow'); // Raton Canyon river
        alt.requestIpl('bh1_47_joshhse_unburnt'); // Josh's house
        alt.requestIpl('bh1_47_joshhse_unburnt_lod'); // Josh's house
        alt.requestIpl('hei_sm_16_interior_v_bahama_milo_'); // Bahama Mamas
        alt.requestIpl('cs3_05_water_grp1'); // Zancudo River
        alt.requestIpl('cs3_05_water_grp1_lod'); // Zancudo River
        alt.requestIpl('trv1_trail_start'); // Zancudo River
        alt.requestIpl('canyonriver01'); // Cassidy Creek
        alt.requestIpl('canyonriver01_lod'); // Cassidy Creek
        alt.requestIpl('ferris_finale_anim'); // Ferris wheel

        alt.requestIpl('shr_int'); // Simeon

        alt.requestIpl('trevorstrailertidy'); // Trevor's Trailer
        alt.removeIpl('trevorstrailertrash'); // Trevor's Trailer

        alt.requestIpl('rc12b_default'); // Pillbox hospital

        alt.removeIpl('cs3_07_mpgates'); // Zancudo Gates

        alt.requestIpl('ch3_rd2_bishopschickengraffiti'); // Graffitis
        alt.requestIpl('cs5_04_mazebillboardgraffiti'); // Graffitis
        alt.requestIpl('cs5_roads_ronoilgraffiti'); // Graffitis

        alt.removeIpl('ufo'); // Hippie Base UFO
        alt.removeIpl('ufo_eye'); // Chiliad UFO
        alt.removeIpl('ufo_lod'); // Zancudo UFO

        alt.removeIpl('redcarpet'); // Red Carpet (Meltdown Movie)

        alt.removeIpl('prologue01'); // Prologue (North Yankton)
        alt.removeIpl('prologue01c'); // Prologue (North Yankton)
        alt.removeIpl('prologue01d'); // Prologue (North Yankton)
        alt.removeIpl('prologue01e'); // Prologue (North Yankton)
        alt.removeIpl('prologue01f'); // Prologue (North Yankton)
        alt.removeIpl('prologue01g'); // Prologue (North Yankton)
        alt.removeIpl('prologue01h'); // Prologue (North Yankton)
        alt.removeIpl('prologue01i'); // Prologue (North Yankton)
        alt.removeIpl('prologue01j'); // Prologue (North Yankton)
        alt.removeIpl('prologue01k'); // Prologue (North Yankton)
        alt.removeIpl('prologue01z'); // Prologue (North Yankton)
        alt.removeIpl('prologue02'); // Prologue (North Yankton)
        alt.removeIpl('prologue03'); // Prologue (North Yankton)
        alt.removeIpl('prologue03b'); // Prologue (North Yankton)
        alt.removeIpl('prologue03_grv_cov'); // Prologue (North Yankton)
        alt.removeIpl('prologue04'); // Prologue (North Yankton)
        alt.removeIpl('prologue04b'); // Prologue (North Yankton)
        alt.removeIpl('prologue04_cover'); // Prologue (North Yankton)
        alt.removeIpl('prologue05'); // Prologue (North Yankton)
        alt.removeIpl('prologue05b'); // Prologue (North Yankton)
        alt.removeIpl('prologue06'); // Prologue (North Yankton)
        alt.removeIpl('prologue06b'); // Prologue (North Yankton)
        alt.removeIpl('prologue06_int'); // Prologue (North Yankton)
        alt.removeIpl('prologue06_pannel'); // Prologue (North Yankton)
        alt.removeIpl('prologuerd'); // Prologue (North Yankton)
        alt.removeIpl('prologuerdb'); // Prologue (North Yankton)
        alt.removeIpl('prologue_distantlights'); // Prologue (North Yankton)
        alt.removeIpl('prologue_lodlights'); // Prologue (North Yankton)
        alt.removeIpl('prologue_m2_door'); // Prologue (North Yankton)

        alt.removeIpl('hei_yacht_heist'); // Porn Yacht
        alt.removeIpl('hei_yacht_heist_bar'); // Porn Yacht
        alt.removeIpl('hei_yacht_heist_bar_lod'); // Porn Yacht
        alt.removeIpl('hei_yacht_heist_bedrm'); // Porn Yacht
        alt.removeIpl('hei_yacht_heist_bedrm_lod'); // Porn Yacht
        alt.removeIpl('hei_yacht_heist_bridge'); // Porn Yacht
        alt.removeIpl('hei_yacht_heist_bridge_lod'); // Porn Yacht
        alt.removeIpl('hei_yacht_heist_enginrm'); // Porn Yacht
        alt.removeIpl('hei_yacht_heist_enginrm_lod'); // Porn Yacht
        alt.removeIpl('hei_yacht_heist_lod'); // Porn Yacht
        alt.removeIpl('hei_yacht_heist_lounge'); // Porn Yacht
        alt.removeIpl('hei_yacht_heist_lounge_lod'); // Porn Yacht
        alt.removeIpl('hei_yacht_heist_slod'); // Porn Yacht

        alt.removeIpl('hei_carrier'); // Aircraft Carrier
        alt.removeIpl('hei_carrier_int1'); // Aircraft Carrier
        alt.removeIpl('hei_carrier_int1_lod'); // Aircraft Carrier
        alt.removeIpl('hei_carrier_int2'); // Aircraft Carrier
        alt.removeIpl('hei_carrier_int2_lod'); // Aircraft Carrier
        alt.removeIpl('hei_carrier_int3'); // Aircraft Carrier
        alt.removeIpl('hei_carrier_int3_lod'); // Aircraft Carrier
        alt.removeIpl('hei_carrier_int4'); // Aircraft Carrier
        alt.removeIpl('hei_carrier_int4_lod'); // Aircraft Carrier
        alt.removeIpl('hei_carrier_int5'); // Aircraft Carrier
        alt.removeIpl('hei_carrier_int5_lod'); // Aircraft Carrier
        alt.removeIpl('hei_carrier_int6'); // Aircraft Carrier
        alt.removeIpl('hei_carrier_int6_lod'); // Aircraft Carrier
        alt.removeIpl('hei_carrier_lod'); // Aircraft Carrier
        alt.removeIpl('hei_carrier_slod'); // Aircraft Carrier

        alt.removeIpl('gr_case0_bunkerclosed'); // Gunrunning Bunker
        alt.removeIpl('gr_case1_bunkerclosed'); // Gunrunning Bunker
        alt.removeIpl('gr_case2_bunkerclosed'); // Gunrunning Bunker
        alt.removeIpl('gr_case3_bunkerclosed'); // Gunrunning Bunker
        alt.removeIpl('gr_case4_bunkerclosed'); // Gunrunning Bunker
        alt.removeIpl('gr_case5_bunkerclosed'); // Gunrunning Bunker
        alt.removeIpl('gr_case6_bunkerclosed'); // Gunrunning Bunker
        alt.removeIpl('gr_case7_bunkerclosed'); // Gunrunning Bunker
        alt.removeIpl('gr_case8_bunkerclosed'); // Gunrunning Bunker
        alt.removeIpl('gr_case9_bunkerclosed'); // Gunrunning Bunker
        alt.removeIpl('gr_case10_bunkerclosed'); // Gunrunning Bunker
        alt.removeIpl('gr_case11_bunkerclosed'); // Gunrunning Bunker

        alt.removeIpl('gr_heist_yacht2'); // Gunrunning Yacht
        alt.removeIpl('gr_heist_yacht2_bar'); // Gunrunning Yacht
        alt.removeIpl('gr_heist_yacht2_bar_lod'); // Gunrunning Yacht
        alt.removeIpl('gr_heist_yacht2_bedrm'); // Gunrunning Yacht
        alt.removeIpl('gr_heist_yacht2_bedrm_lod'); // Gunrunning Yacht
        alt.removeIpl('gr_heist_yacht2_bridge'); // Gunrunning Yacht
        alt.removeIpl('gr_heist_yacht2_bridge_lod'); // Gunrunning Yacht
        alt.removeIpl('gr_heist_yacht2_enginrm'); // Gunrunning Yacht
        alt.removeIpl('gr_heist_yacht2_enginrm_lod'); // Gunrunning Yacht
        alt.removeIpl('gr_heist_yacht2_lod'); // Gunrunning Yacht
        alt.removeIpl('gr_heist_yacht2_lounge'); // Gunrunning Yacht
        alt.removeIpl('gr_heist_yacht2_lounge_lod'); // Gunrunning Yacht
        alt.removeIpl('gr_heist_yacht2_slod'); // Gunrunning Yacht

        alt.removeIpl('xm_hatch_01_cutscene'); // Doomsday Bunker
        alt.removeIpl('xm_hatch_02_cutscene'); // Doomsday Bunker
        alt.removeIpl('xm_hatch_03_cutscene'); // Doomsday Bunker
        alt.removeIpl('xm_hatch_04_cutscene'); // Doomsday Bunker
        alt.removeIpl('xm_hatch_06_cutscene'); // Doomsday Bunker
        alt.removeIpl('xm_hatch_07_cutscene'); // Doomsday Bunker
        alt.removeIpl('xm_hatch_08_cutscene'); // Doomsday Bunker
        alt.removeIpl('xm_hatch_09_cutscene'); // Doomsday Bunker
        alt.removeIpl('xm_hatch_10_cutscene'); // Doomsday Bunker
        alt.removeIpl('xm_hatch_closed'); // Doomsday Bunker
        alt.removeIpl('xm_siloentranceclosed_x17'); // Doomsday Silo
        alt.requestIpl('xm_bunkerentrance_door'); // Doomsday Silo Entrance
        alt.removeIpl('xm_hatches_terrain'); // Doomsday Silo
        alt.removeIpl('xm_hatches_terrain_lod'); // Doomsday Silo

        alt.requestIpl('hei_dlc_windows_casino'); // Casino
        alt.requestIpl('hei_dlc_casino_aircon'); // Casino
        alt.requestIpl('vw_dlc_casino_door'); // Casino
        alt.requestIpl('hei_dlc_casino_door'); // Casino
    }
    static initializeEntitySets(): void {
        // Michael
        let interiorID = native.getInteriorAtCoords(-807.343, 174.98, 71.163);
        if (native.isValidInterior(interiorID)) {
            native.deactivateInteriorEntitySet(interiorID, 'V_Michael_Scuba');
            native.activateInteriorEntitySet(interiorID, 'V_Michael_M_items');
            native.activateInteriorEntitySet(interiorID, 'V_Michael_D_items');
            native.activateInteriorEntitySet(interiorID, 'V_Michael_S_items');
            native.activateInteriorEntitySet(interiorID, 'V_Michael_L_Items');
            native.deactivateInteriorEntitySet(interiorID, 'V_Michael_M_moved');
            native.deactivateInteriorEntitySet(interiorID, 'V_Michael_D_Moved');
            native.deactivateInteriorEntitySet(interiorID, 'V_Michael_L_Moved');
            native.deactivateInteriorEntitySet(interiorID, 'V_Michael_S_items_swap');
            native.deactivateInteriorEntitySet(interiorID, 'V_Michael_M_items_swap');
            native.activateInteriorEntitySet(interiorID, 'V_Michael_bed_tidy');
            native.deactivateInteriorEntitySet(interiorID, 'V_Michael_bed_Messy');
            native.deactivateInteriorEntitySet(interiorID, 'Michael_premier');
            native.deactivateInteriorEntitySet(interiorID, 'V_Michael_FameShame');
            native.deactivateInteriorEntitySet(interiorID, 'V_Michael_plane_ticket');
            native.deactivateInteriorEntitySet(interiorID, 'V_Michael_JewelHeist');
            native.deactivateInteriorEntitySet(interiorID, 'burgershot_yoga');
            native.refreshInterior(interiorID);
        }

        // Simeon
        interiorID = native.getInteriorAtCoords(-41.402, -1097.775, 25.423);
        if (native.isValidInterior(interiorID)) {
            native.activateInteriorEntitySet(interiorID, 'csr_beforeMission');
            native.deactivateInteriorEntitySet(interiorID, 'csr_inMission');
            native.deactivateInteriorEntitySet(interiorID, 'csr_afterMissionA');
            native.deactivateInteriorEntitySet(interiorID, 'csr_afterMissionB');
            native.activateInteriorEntitySet(interiorID, 'shutter_open');
            native.deactivateInteriorEntitySet(interiorID, 'shutter_closed');
            native.refreshInterior(interiorID);
        }

        // Franklin's aunt
        interiorID = native.getInteriorAtCoords(-11.829, -1437.688, 30.105);
        if (native.isValidInterior(interiorID)) {
            native.deactivateInteriorEntitySet(interiorID, 'V_57_FranklinStuff');
            native.deactivateInteriorEntitySet(interiorID, 'V_57_Franklin_LEFT');
            native.deactivateInteriorEntitySet(interiorID, 'V_57_GangBandana');
            native.deactivateInteriorEntitySet(interiorID, 'V_57_Safari');
            native.refreshInterior(interiorID);
        }

        // Franklin's villa
        interiorID = native.getInteriorAtCoords(3.199, 529.78, 169.626);
        if (native.isValidInterior(interiorID)) {
            native.deactivateInteriorEntitySet(interiorID, 'franklin_unpacking');
            native.deactivateInteriorEntitySet(interiorID, 'franklin_settled');
            native.deactivateInteriorEntitySet(interiorID, 'showhome_only');
            native.activateInteriorEntitySet(interiorID, 'unlocked');
            native.deactivateInteriorEntitySet(interiorID, 'locked');
            native.deactivateInteriorEntitySet(interiorID, 'progress_flyer');
            native.deactivateInteriorEntitySet(interiorID, 'progress_tux');
            native.deactivateInteriorEntitySet(interiorID, 'progress_tshirt');
            native.deactivateInteriorEntitySet(interiorID, 'bong_and_wine');
            native.refreshInterior(interiorID);
        }

        // Floyd
        interiorID = native.getInteriorAtCoords(-1153.183, -1518.347, 9.63);
        if (native.isValidInterior(interiorID)) {
            native.activateInteriorEntitySet(interiorID, 'swap_clean_apt');
            native.activateInteriorEntitySet(interiorID, 'layer_debra_pic');
            native.activateInteriorEntitySet(interiorID, 'layer_whiskey');
            native.activateInteriorEntitySet(interiorID, 'swap_sofa_A');
            native.deactivateInteriorEntitySet(interiorID, 'layer_mess_A');
            native.deactivateInteriorEntitySet(interiorID, 'layer_mess_B');
            native.deactivateInteriorEntitySet(interiorID, 'layer_mess_C');
            native.deactivateInteriorEntitySet(interiorID, 'layer_sextoys_a');
            native.deactivateInteriorEntitySet(interiorID, 'swap_sofa_B');
            native.deactivateInteriorEntitySet(interiorID, 'swap_wade_sofa_A');
            native.deactivateInteriorEntitySet(interiorID, 'layer_wade_shit');
            native.deactivateInteriorEntitySet(interiorID, 'layer_torture');
            native.activateInteriorEntitySet(interiorID, 'swap_mrJam_A');
            native.deactivateInteriorEntitySet(interiorID, 'swap_mrJam_B');
            native.deactivateInteriorEntitySet(interiorID, 'swap_mrJam_C');
            native.refreshInterior(interiorID);
        }

        // Trevor's Trailer
        interiorID = native.getInteriorAtCoords(1972.747, 3818.127, 32.025);
        if (native.isValidInterior(interiorID)) {
            native.deactivateInteriorEntitySet(interiorID, 'V_26_Trevor_Helmet3');
            native.deactivateInteriorEntitySet(interiorID, 'V_24_Trevor_Briefcase3');
            native.deactivateInteriorEntitySet(interiorID, 'V_26_Michael_Stay3');
            native.refreshInterior(interiorID);
        }

        // Ammunation (Vinewood Plaza)
        interiorID = native.getInteriorAtCoords(247.371, -47.245, 68.94);
        if (native.isValidInterior(interiorID)) {
            native.activateInteriorEntitySet(interiorID, 'GunStoreHooks');
            native.refreshInterior(interiorID);
        }

        // Ammunation (Lester)
        interiorID = native.getInteriorAtCoords(843.298, -1028.106, 27.194);
        if (native.isValidInterior(interiorID)) {
            native.activateInteriorEntitySet(interiorID, 'GunStoreHooks');
            native.refreshInterior(interiorID);
        }

        // Ammunation (Weazel News)
        interiorID = native.getInteriorAtCoords(-663.171, -940.758, 20.829);
        if (native.isValidInterior(interiorID)) {
            native.activateInteriorEntitySet(interiorID, 'GunStoreHooks');
            native.refreshInterior(interiorID);
        }

        // Ammunation (Maze Bank West)
        interiorID = native.getInteriorAtCoords(-1310.876, -392.009, 35.695);
        if (native.isValidInterior(interiorID)) {
            native.activateInteriorEntitySet(interiorID, 'GunStoreHooks');
            native.refreshInterior(interiorID);
        }

        // Ammunation (Chumash Plaza)
        interiorID = native.getInteriorAtCoords(-3167.296, 1084.709, 19.838);
        if (native.isValidInterior(interiorID)) {
            native.activateInteriorEntitySet(interiorID, 'GunStoreHooks');
            native.refreshInterior(interiorID);
        }

        // Ammunation (Zancudo)
        interiorID = native.getInteriorAtCoords(-1114.845, 2693.809, 17.554);
        if (native.isValidInterior(interiorID)) {
            native.activateInteriorEntitySet(interiorID, 'GunStoreHooks');
            native.refreshInterior(interiorID);
        }

        // Ammunation (Sandy Shores)
        interiorID = native.getInteriorAtCoords(1696.952, 3755.445, 33.705);
        if (native.isValidInterior(interiorID)) {
            native.activateInteriorEntitySet(interiorID, 'GunStoreHooks');
            native.refreshInterior(interiorID);
        }

        // Ammunation (Paleto Bay)
        interiorID = native.getInteriorAtCoords(-327.17, 6079.257, 30.454);
        if (native.isValidInterior(interiorID)) {
            native.activateInteriorEntitySet(interiorID, 'GunStoreHooks');
            native.refreshInterior(interiorID);
        }

        // Ammunation (Highway East)
        interiorID = native.getInteriorAtCoords(2568.834, 299.788, 107.734);
        if (native.isValidInterior(interiorID)) {
            native.activateInteriorEntitySet(interiorID, 'GunStoreHooks');
            native.refreshInterior(interiorID);
        }

        // Ammunation (Meeting Point)
        interiorID = native.getInteriorAtCoords(10.907, -1105.658, 28.796);
        if (native.isValidInterior(interiorID)) {
            native.activateInteriorEntitySet(interiorID, 'GunClubWallHooks');
            native.refreshInterior(interiorID);
        }

        // Ammunation (Docks)
        interiorID = native.getInteriorAtCoords(821.144, -2154.891, 28.618);
        if (native.isValidInterior(interiorID)) {
            native.activateInteriorEntitySet(interiorID, 'GunClubWallHooks');
            native.refreshInterior(interiorID);
        }

        // Lester's factory
        interiorID = native.getInteriorAtCoords(717.299, -974.427, 23.788);
        if (native.isValidInterior(interiorID)) {
            native.deactivateInteriorEntitySet(interiorID, 'V_53_Agency_Blueprint');
            native.deactivateInteriorEntitySet(interiorID, 'V_35_KitBag');
            native.deactivateInteriorEntitySet(interiorID, 'V_35_Fireman');
            native.deactivateInteriorEntitySet(interiorID, 'V_35_Body_Armour');
            native.deactivateInteriorEntitySet(interiorID, 'Jewel_Gasmasks');
            native.deactivateInteriorEntitySet(interiorID, 'v_53_agency _overalls');
            native.refreshInterior(interiorID);
        }

        // Stripclub
        interiorID = native.getInteriorAtCoords(128.793, -1292.104, 27.892);
        if (native.isValidInterior(interiorID)) {
            native.deactivateInteriorEntitySet(interiorID, 'V_19_Trevor_Mess');
            native.refreshInterior(interiorID);
        }
    }
}
