const menuItems = [
  {
    name: "HOSE",
    path: "/HSX",
    floor: "HSX",
    children: [
      {
        name: "VNI",
        path: "/chung-khoan/VNI",
        query: "s=quote&l=All",
      },
      {
        name: "VN30",
        path: "/chung-khoan/VN30",
        query: "s=quote&l=VN30",
      },
      {
        name: "Giao dịch thỏa thuận",
        path: "/chung-khoan/thoa-thuan-hsx",
        query: "thoa-thuan-hsx",
      },
      {
        name: "VNXALL",
        path: "/chung-khoan/VNXALL",
        query: "s=quote&l=VNXALL",
      },
      {
        name: "VN100",
        path: "/chung-khoan/VN100",
        query: "s=quote&l=VN100",
      },
      {
        name: "VNALL",
        path: "/chung-khoan/VNALL",
        query: "s=quote&l=VNALL",
      },
      {
        name: "VNMID",
        path: "/chung-khoan/VNMID",
        query: "s=quote&l=VNMID",
      },
      {
        name: "VNSML",
        path: "/chung-khoan/VNSML",
        query: "s=quote&l=VNSML",
      },
    ],
  },
  {
    name: "HNX",
    path: "/",
    floor: "HNX",
    children: [
      {
        name: "HNX",
        path: "/chung-khoan/HNX",
        query: "s=quote&l=HNXIndex",
      },
      {
        name: "HNX30",
        path: "/chung-khoan/HNX30",
        query:"s=quote&l=HNX30",
      },
      {
        name: "BOND",
        path: "/chung-khoan/BOND",
        query: "s=quote&l=BOND",
      },
      {
        name: "Giao dịch thỏa thuận",
        path: "/chung-khoan/thoa-thuan-hnx",
        query: "thoa-thuan-hsx",
      },
    ],
  },

  {
    name: "UPCOM",
    path: "/UPCOM",
    floor: "HNX",
    children: [
      {
        name: "UPCOM",
        path: "/chung-khoan/UPCOM",
        query: "s=quote&l=HNXUpcomIndex",
      },
      {
        name: "Giao dịch thỏa thuận",
        path: "/chung-khoan/thoa-thuan-upcom",
        query: "thoa-thuan-hsx",
      },
    ],
  },
  {
    name: "Ngành",
    path: "/co-phieu-nganh",
    floor: "HNX",
    children: [
      {
        name: "Bán lẻ",
        path: "/chung-khoan/Ban-le",
        query: "s=quote&l=ABS,AME,ASA,AUM,BIG,BMF,BTT,CCI,CCP,CDP,CEN,CGL,CLX,CMV,COM,CTC,CVN,DAS,DDG,DGW,DHM,DLT,DPS,DST,DT4,DVC,FBA,FDG,FRT,GCB,GCF,GPC,HAM,HAX,HCD,HFC,HGC,HHA,HID,HIG,HKB,HMG,HPM,HTC,HTL,HTM,IFC,ILA,KDM,KLF,KLM,KSQ,KTC,LBC,LPT,MCI,MEG,MSC,MTS,MWG,NO1,PCH,PCT,PEQ,PET,PIT,PJC,PMJ,PND,PNG,PNJ,POB,POV,PPT,PPY,PSB,PSC,PSD,PTH,PTM,PTV,PVO,QBS,SFC,SHN,SIC,ST8,STH,SVC,SVN,T12,TAG,TCO,TDG,TH1,THS,TIE,TLP,TMC,TNA,TOP,TSC,TTH,TTZ,TV6,VGP,VHF,VNN,VNP,VT1,VT8,VVS,VXT",
      },
      {
        name: "Bảo hiểm",
        path: "/chung-khoan/HNX3",
        query: "s=quote&l=ABI,AIC,BIC,BLI,BMI,BVH,MIG,PGI,PRE,PTI,PVI,VNR",
      },
      {
        name: "Cơ sở hạ tầng giao thông vận tải",
        path: "/BON",
        query: "s=quote&l=ACV,ARM,ASG,AST,CAG,CCR,CCT,CDN,CIA,CLL,CPI,CQN,DS3,DVP,GIC,GMD,HAH,IST,MVN,NAS,NCS,NCT,PDN,PHP,PNP,PSN,PVY,QSP,SAC,SAL,SAS,SCO,SCS,SGP,TCW,TNP,TOS,TUG,VGR,VSC",
      },
      {
        name: "Công nghệ thông tin tích hợp",
        path: "/table",
        query: "s=quote&l=CMG,CMT,ELC,FPT,HPT,ONE,PAI,SBD",
      },
      {
        name: "Công ty chứng khoán",
        path: "/HN",
        query: "s=quote&l=AAS,AGR,APG,APS,ART,BMS,BSI,BVS,CSI,CTS,DSC,EVS,FSC,FTS,HAC,HBS,HCM,IVS,KLS,MBS,ORS,PHS,PSI,SBS,SHS,SSI,TCI,TVB,TVS,VCI,VDS,VFS,VIG,VIX,VND,VUA,WSS",
      },
      {
        name: "Dịch vụ & thiết bị y tế",
        path: "/HNX3",
        query: "s=quote&l=AMP,AMV,BBT,DMC,DNM,DTP,JVC,MEF,MRF,SOV,SRA,TNH,TTD,YTC",
      },
      {
        name: "Dịch vụ công cộng",
        path: "/BON",
        query: "s=quote&l=ASP,AVC,BDW,BGW,BHA,BJC,BLW,BNW,BPW,BSA,BTP,BTW,BWA,BWE,BWS,CHP,CLW,CMW,CTW,DBW,DNA,DNC,DNH,DNN,DNW,DRL,DTE,DTK,DTV,DWC,DWS,EAD,EBA,GDW,GE2,GEG,GHC,GLW,GSM,HAW,HBW,HDW,HGW,HJS,HNA,HND,HPD,HPW,HTW,HWS,IPA,ISH,KHP,KHW,LAW,LCW,LDW,LKW,LWS,MTG,NAW,NBP,NBT,NBW,NCP,ND2,NDW,NED,NLS,NNB,NNT,NQB,NQN,NQT,NS2,NS3,NSL,NT2,NTH,NTW,NVP,PBK,PCG,PGV,PIC,PJS,PMW,POW,PPC,PTC,PVG,PWS,QNW,QPH,QTP,REE,S4A,S72,SBA,SBH,SBM,SCH,SD3,SD9,SEB,SHP,SII,SJD,SMA,SP2,STW,SVH,TAW,TBC,TDB,TDM,TDW,THN,THW,TIC,TMP,TNW,TOW,TQW,TTA,TTE,TVW,UIC,VAV,VCP,VCW,VLW,VPD,VPW,VSH,WTN,XMP",
      },
      {
        name: "Dịch vụ thương mại chuyên biệt",
        path: "/table",
        query: "s=quote&l=AIG,APC,BLU,BMD,BRS,BTH,BTU,BUD,CAM,CCH,CDH,CDO,CER,CFM,CHS,CNN,CPH,CVH,DCH,DKH,DNE,DTB,DUS,EFI,EIC,HEC,HEJ,HEP,HGR,HTK,HTU,IBC,IBD,IBN,ICG,IDN,IDV,IHK,IKH,ILC,IN4,INC,IPH,LEC,MAS,MBN,MC3,MDA,MGC,MHP,MHY,MLC,MND,MPY,MQB,MQN,MTB,MTH,MTL,MTV,MVY,NAC,NAU,NHV,NUE,PLE,PPE,PPS,PTP,PYU,QNT,QNU,SBV,SDA,SDC,SDV,SLC,SON,SRB,SSN,SSU,STT,STU,SUM,SVL,SZE,TAP,TBN,TEC,THU,TSG,TV1,TV3,TV4,TVG,TVH,TVM,TVU,UCT,UDL,UMC,UPC,USD,VBG,VCM,VCT,VGV,VLP,VNC,VPC,VQC,VTK",
      },
      {
        name: "Dịch vụ viễn thông",
        path: "/HN",
        query: "s=quote&l=ABC,ABR,CAB,FOC,FOX,GLT,ICT,MFS,PMT,SGT,TTN,UNI,VGI,VIE,VTC",
      },
      {
        name: "Dược phẩm, Công nghệ sinh học",
        path: "/HNX3",
        query: "s=quote&l=AGP,BCP,BIO,CGP,CNC,DAN,DBD,DBM,DBT,DCL,DDN,DHD,DHG,DHN,DHT,DKP,DP1,DP2,DP3,DPH,DPP,DTG,DVM,DVN,HDP,IMP,LDP,MED,MKP,MKV,MTP,NDC,NDP,NTF,OPC,PBC,PMC,PME,PPP,SPM,TRA,TVP,TW3,UPH,VDP,VET,VMD,VNY,VXP",
      },
      {
        name: "Giấy và các sản phẩm từ gỗ",
        path: "/BON",
        query: "s=quote&l=ACG,AGG,BKG,CAP,CHC,DAP,FRC,FRM,FSO,GDT,GTA,GVT,HAP,HHP,MDF,PIS,PTB,SAV,TLD,TMW,TQN,TTF,VHG,VID,VIF",
      },
      {
        name: "Hàng tiêu dùng lâu bền",
        path: "/table",
        query: "s=quote&l=A32,AAT,ADS,AG1,AQN,ATD,ATS,BCV,BDF,BDG,BDP,BMG,BTV,BVN,CET,DAH,DCD,DCG,DCS,DLC,DLD,DM7,DNT,DQC,DSN,DSP,DXL,EIN,EVE,FCC,FDT,FTM,G20,GIL,GMC,GTD,GTK,HCB,HDM,HES,HFS,HGT,HKC,HLT,HNI,HOT,HPU,HRG,HSM,HTG,HUG,KMR,KSD,LGM,M10,MGG,MHL,MKT,MPT,MSH,MTC,NDT,NHT,NJC,NPH,NPS,NTT,NVT,OCH,ONW,PDC,PHN,PPH,PTG,RAL,RDP,RGC,RIC,SFN,SGH,SGI,SHA,SHI,SPB,SSF,STK,SVD,TCM,TCT,TDT,TET,TLI,TNG,TSD,TSJ,TTG,TTR,TTT,TVT,VDM,VDN,VGG,VGT,VIR,VNG,VTB,VTD,VTG,VTI,VTR,X20,X26,XHC",
      },
      {
        name: "Kim loại & Khai khoáng",
        path: "/HN",
        query: "s=quote&l=ACM,ATG,BAM,BCA,BGM,BKC,BMC,BVG,CBI,DNS,DNY,DTL,GLC,HGM,HLA,HMC,HPG,HSG,HSV,HUX,ITQ,KCB,KHB,KKC,KSA,KSH,KSV,KTB,KVC,LCM,MEL,MIM,MMC,MSR,MTA,MTM,NKG,NSH,NSHC,PAS,PEC,POM,PTK,SMC,SSM,TDS,TIS,TKU,TLH,TMG,TNB,TNI,TNS,TNT,TTS,TVN,VCA,VDT,VGL,VGS,VIM,VIS",
      },
      {
        name: "Năng lượng",
        path: "/HNX3",
        query: "s=quote&l=APP,BCB,BSR,CLM,CNG,CST,CZC,GAS,HLC,ITS,MDC,MVB,NBC,OIL,PCN,PDT,PEG,PGC,PGD,PGS,PLX,PMG,POS,PSH,PTX,PVB,PVC,PVD,PVP,PVS,PVT,TC6,TCS,TDN,THT,TMB,TND,TVD,VDB,VMG,VPG",
      },
      {
        name: "Ngân hàng",
        path: "/BON",
        query: "s=quote&l=ABB,ACB,BAB,BID,BVB,CTG,EIB,EVF,HDB,KLB,LPB,MBB,MSB,MXB,NAB,NVB,OCB,PGB,SGB,SHB,SSB,STB,TCB,TPB,VAB,VBB,VCB,VIB,VPB",
      },
      {
        name: "Nguyên vật liệu",
        path: "/table",
        query: "s=quote&l=ADP,BFC,BT1,CPC,CSV,DCI,DCM,DDV,DGC,DGL,DHB,DOC,DPM,DTN,DTT,DVG,HAI,HDA,HNP,HPH,HPP,HSI,HSP,HVT,LAS,NFC,NHH,NSG,PAT,PBT,PCE,PGN,PLC,PLP,PMB,PSE,PSW,SDN,SFG,SIV,SPC,SVG,VAF,VFG,VPS,XPH",
      },
      {
        name: "Ô tô & Phụ tùng",
        path: "/BON",
        query : "s=quote&l=AFC,BRR,CSM,CTF,DPD,DPR,DRC,DRG,DRI,FBC,FT1,GER,GGG,GVR,HRC,KTL,LNC,PHR,RBC,RTB,SBR,SRC,TKR,TMT,TNC,TRC,VKC,VMA,VTQ"
      },
      {
        name: "Phần cứng",
        path: "/table",
        query : "s=quote&l=BEL,HNE,ITD,KST,PIA,SAM"
      },
      {
        name: "Phần mềm",
        path: "/HN",
        query : "s=quote&l=SFT,VLA"
      },
      {
        name: "Quản lý, phát triển bất động sản",
        path: "/HNX3",
        query : "s=quote&l=AAV,API,BAX,BCI,BCM,BSC,C21,CCL,CDG,CEO,CIG,CII,CK8,CKG,CNT,CRE,CTX,D11,D2D,DIG,DKC,DLR,DRH,DTA,DTI,DXG,DXS,EVG,FDC,FIR,FLC,FTI,HAR,HBI,HD6,HD8,HDC,HDG,HHN,HIZ,HLD,HPI,HPX,HQC,HRB,HTT,HU6,ICN,IDC,IDJ,IJC,ITA,ITC,KAC,KBC,KDH,KHA,KHG,KSF,KTT,L14,LDG,LGL,LHG,LMH,LSG,MA1,MH3,MST,NBB,NDN,NHN,NLG,NRC,NTC,NTL,NVL,OGC,PDR,PFV,PHH,PLA,PNT,PPI,PSG,PTL,PV2,PVL,PWA,PXA,QCG,RCL,S96,SCR,SD7,SDI,SDU,SGR,SHX,SID,SJC,SJS,SNZ,SQC,SSH,STL,SZB,SZC,SZG,SZL,TBH,TCH,TDC,TDH,TIG,TIP,TIX,TN1,UDJ,VC3,VCR,VEF,VES,VHD,VHM,VIC,VNI,VPH,VPI,VPR,VRC,VRE,VRG,VTJ,XDH"
      },
      {
        name: "Quỹ",
        path: "/BON",
        query : "s=quote&l=ASIAGF,E1SSHN30,E1VFVN30,FUCTVGF1,FUCTVGF2,FUCTVGF3,FUCVREIT,FUEDCMID,FUEIP100,FUEKIV30,FUEMAV30,FUESSV30,FUESSV50,FUESSVFL,FUEVFVND,FUEVN100,MAFPF1,PRUBF1,VFMVF1,VFMVF4,VFMVFA"
      },
      {
        name: "Sản phẩm cá nhân & hộ gia đình",
        path: "/table",
        query :"s=quote&l=LIX,NET,TLG"
      },
      {
        name: "Tài chính chuyên biệt khác",
        path: "/BON",
        query : "s=quote&l=BCG,FIT,HSA,SDF,TIN,TVC"
      },
      {
        name: "Thực phẩm & Đồ uống",
        path: "/table",
        query : "s=quote&l=AAM,ABT,ACL,AFX,AGF,AGM,AGX,ANT,ANV,APF,APT,ASM,ATA,AVF,BAF,BAL,BBC,BBM,BCF,BHG,BHK,BHN,BHP,BHS,BII,BKH,BLF,BLT,BMV,BNA,BNTB,BQB,BSD,BSH,BSL,BSP,BSQ,BTB,C22,CAD,CAN,CAT,CBC,CBS,CCA,CFC,CFV,CLC,CMF,CMN,CMX,CNA,CPA,CTP,DAT,DBC,DFS,DMN,DNF,EPC,FCS,FGL,FHN,FMC,GGS,GQN,GTC,GTN,HAD,HAF,HAG,HAT,HAV,HBH,HFX,HGA,HHC,HJC,HKT,HLB,HLG,HNF,HNG,HNM,HNR,HSL,HVA,HVG,ICF,IDI,IDP,IFS,JOS,KDC,KDF,KGM,KHS,KSC,KSE,KTS,LAF,LSS,LTG,LYF,MCF,MCH,MCM,MLS,MML,MPC,MSN,MXC,NAF,NDF,NGC,NHS,NNQ,NSC,NSS,NST,NTSF,PAN,PCF,PRO,PSL,QHW,QNS,S33,SAB,SAF,SB1,SBL,SBT,SCA,SCD,SCV,SEA,SEP,SGC,SGO,SJ1,SKH,SKN,SKV,SLS,SMB,SNC,SPD,SPH,SPV,SSC,STD,TAC,TAN,TAR,TCJ,TFC,THB,THP,THV,TID,TS4,TTJ,UXC,VCF,VDL,VHC,VHE,VHI,VKD,VLC,VLF,VNH,VNM,VOC,VSF,VSN,VTL,WSB"
      },
      {
        name: "Truyền thống và xuất bản",
        path: "/HN",
        query : "s=quote&l=ADC,ADG,BDB,BED,BST,DAD,DAE,DNB,EBS,ECI,EID,EPH,FHS,HAB,HBE,HEV,HST,HTP,INN,KBE,LBE,NBE,ODE,PNC,QST,SAP,SED,SGD,SMN,STC,TPH,VNB,VNX,YEG"
      },
      {
        name: "Tư liệu sản xuất",
        path: "/HNX3",
        query : "s=quote&l=AC4,ACC,ACS,ALV,AMS,APL,ASD,ATB,B82,BCE,BHT,BM9,BMN,BOT,BTC,BVL,C12,C36,C47,C4G,C69,C71,C92,CAV,CC1,CC4,CCV,CDC,CDR,CEC,CEE,CEG,CH5,CI5,CID,CIP,CJC,CKA,CKD,CKH,CKV,CLG,CMC,CMK,CMS,CPW,CSC,CT3,CT5,CT6,CTB,CTD,CTN,CTR,CTT,CVC,CX8,D26,DC1,DC2,DC4,DCF,DFC,DFF,DGT,DHP,DIH,DLG,DLM,DNR,DPG,DTD,DVH,DX2,DXD,DZM,E12,E29,EMC,EME,EMG,FCN,G36,GEE,GEX,GH3,GMA,GTH,GTS,H11,HAN,HAS,HBC,HC1,HC3,HCI,HD2,HD3,HDO,HEM,HFB,HHR,HHV,HLE,HLS,HMS,HTE,HTI,HTN,HU1,HU3,HU4,HUT,HVH,I10,ICC,ICI,IME,JSC,KGU,KIP,L10,L12,L18,L35,L40,L43,L44,L45,L61,L62,L63,LAI,LCD,LCG,LG9,LHC,LIG,LLM,LM3,LM7,LM8,LMI,LO5,LTC,MBG,MCG,MCO,MCT,MDT,MEC,MES,MIE,NAG,NDX,NHA,NMK,NTB,NXT,PAC,PC1,PCC,PEN,PFL,PHC,PID,PIV,PMS,POT,PQN,PRT,PTD,PTO,PVA,PVE,PVH,PVM,PVR,PVV,PVX,PXC,PXI,PXL,PXM,PXS,PXT,QCC,QHD,QLD,QTC,RCC,RCD,RLC,RTH,S12,S27,S55,S74,S99,SC5,SCG,SCI,SCY,SD1,SD2,SD4,SD5,SD6,SD8,SDB,SDD,SDE,SDJ,SDK,SDP,SDT,SDX,SHE,SHG,SIG,SIP,SJE,SJF,SJG,SJM,SMT,SRF,SVT,TA3,TA6,TA9,TBD,TBT,TCD,TCK,TEL,TGP,THD,THI,TKC,TL4,TNM,TNY,TS3,TS5,TSB,TST,TTL,TTV,TV2,TYA,UDC,UEM,USC,V11,V12,V15,V21,VAT,VBH,VC1,VC2,VC5,VC6,VC7,VC9,VCC,VCE,VCG,VE1,VE2,VE3,VE4,VE8,VE9,VEA,VEC,VEE,VIW,VMC,VMI,VNE,VSE,VSI,VTE,VTH,VVN,VW3,VWS,VXB,XLV,XMC"
      },
      {
        name: "Vận tải",
        path: "/BON",
        query : "s=quote&l=BLN,BSG,BTR,BXT,CMP,CNH,CTI,CXH,DAR,DBH,DDH,DDM,DL1,DNL,DOP,DSS,DSV,DXP,EMS,GSP,GTT,HCS,HCT,HHG,HHS,HLR,HMH,HNB,HNT,HRT,HTH,HTR,HTV,HVN,ILB,ILS,ISG,LGC,MAC,MHC,MLN,MNC,NAP,NBR,NBS,NOS,NTR,NWT,PAP,PDV,PGT,PJT,PKR,PLO,PRC,PSP,PTS,PTT,QBR,QLT,QNP,RAT,RHN,RTS,SFI,SGN,SGS,SHC,SKG,SRT,SSG,STG,STS,SWC,TCL,THR,TJC,TMS,TOT,TPS,TR1,TRS,VFC,VFR,VIN,VIP,VJC,VLG,VMS,VNA,VNF,VNL,VNS,VNT,VOS,VPA,VSA,VSG,VSM,VSP,VST,VTM,VTO,VTP,VTX,WCS,WTC,YRC"
      },
      {
        name: "Vật liệu xây dựng",
        path: "/table",
        query : "s=quote&l=AAA,ACE,ALT,AMC,AMD,APH,BBH,BBS,BCC,BDT,BHC,BHV,BMJ,BMP,BPC,BT6,BTD,BTG,BTN,BTS,BXH,C32,CCM,CE1,CGV,CLH,CMD,CMI,CQT,CRC,CTA,CVT,CYC,DAC,DAG,DCR,DCT,DHA,DHC,DIC,DID,DND,DNP,DPC,DSG,DTC,DXV,FCM,FIC,FID,GAB,GKM,GMH,GMX,GND,HBD,HCC,HII,HKP,HLY,HMR,HOM,HPB,HPS,HT1,HUB,HVX,KCE,KHD,KHL,KMT,KOS,KPF,KSB,KSK,KSS,LBM,LCC,LCS,LIC,LMC,LQN,LUT,MCC,MCP,MDG,MIC,MVC,NAV,NHC,NHP,NNC,NNG,NTP,PBP,PCM,PDB,PMP,PPG,PTE,PX1,QNC,ROS,SCC,SCJ,SCL,SDG,SDH,SDY,SPA,SPI,SPP,STP,STV,SVI,TB8,TBX,TCR,TDF,TDP,TEG,TGG,THG,TKA,TKG,TLT,TMX,TPC,TPP,TRT,TTB,TTC,TTP,TVA,TXM,VBC,VCS,VCX,VGC,VHH,VHL,VIH,VIT,VKP,VLB,VPK,VTA,VTS,VTV,VTZ,X18,X77,XMD,YBC,YBM"
      },
    ],
  },
  {
    name: "Thống kê",
    path: "/thong-ke-index",
    floor: "TableTK",
    // floor: "HNX",
    children: [
      {
        name: "Thống kê Index",
        path: "/chung-khoan/thong-ke-index",
        query : "HIST_INDEX"
      },
      {
        name: "Thống kê Giá",
        path: "/chung-khoan/thong-ke-gia",
        query : "HIST_PRICE"
      },
      {
        name: "Thống kê Đặt lệnh",
        path: "/chung-khoan/thong-ke-dat-lenh",
        query : "HIST_ORDER"
      },
      {
        name: "Giao dịch khớp lệnh NDTNN",
        path: "/chung-khoan/giao-dich-khop-lenh-ndtnn",
        query : "HIST_FOREIGN_NM"
      },
      {
        name: "Giao dịch thỏa thuận NDTNN",
        path: "/chung-khoan/giao-dich-thoa-thuan-ndtnn",
        query : "HIST_FOREIGN_PT"
      },
    ],
  },
  {
    name: "Chứng quyền",
    path: "/keo",
    floor: "HSX",
    children: [
      {
        name: "CW",
        path: "/chung-khoan/CW",
        query : "s=quote&l=CACB2208,CACB2301,CFPT2210,CFPT2213,CFPT2214,CFPT2301,CFPT2302,CFPT2303,CHPG2226,CHPG2227,CHPG2301,CHPG2302,CHPG2303,CHPG2304,CHPG2305,CHPG2306,CMBB2211,CMBB2214,CMBB2215,CMBB2301,CMBB2302,CMBB2303,CMSN2215,CMWG2214,CMWG2215,CMWG2301,CMWG2302,CSTB2224,CSTB2225,CSTB2301,CSTB2302,CSTB2303,CTCB2212,CTCB2215,CTCB2216,CTCB2301,CTPB2301,CVHM2216,CVHM2219,CVHM2220,CVIB2201,CVIB2301,CVNM2212,CVPB2212,CVPB2214,CVPB2301,CVPB2302,CVRE2216,CVRE2220,CVRE2221,CVRE2301"
      },
    ],
  },
];

export default menuItems;
