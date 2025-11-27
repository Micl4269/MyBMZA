import { BMWSeries } from "@/types";

export const bmwVehicles: BMWSeries[] = [
  {
    id: "1-series",
    name: "1 Series",
    slug: "1-series",
    generations: [
      {
        id: "e81-e82-e87-e88",
        seriesId: "1-series",
        code: "E81/E82/E87/E88",
        name: "First Generation",
        yearStart: 2004,
        yearEnd: 2013,
        models: [
          { id: "116i-e87", generationId: "e81-e82-e87-e88", name: "116i" },
          { id: "118i-e87", generationId: "e81-e82-e87-e88", name: "118i" },
          { id: "120i-e87", generationId: "e81-e82-e87-e88", name: "120i" },
          { id: "125i-e82", generationId: "e81-e82-e87-e88", name: "125i" },
          { id: "130i-e87", generationId: "e81-e82-e87-e88", name: "130i" },
          { id: "135i-e82", generationId: "e81-e82-e87-e88", name: "135i" },
          { id: "1m-e82", generationId: "e81-e82-e87-e88", name: "1M" },
        ],
      },
      {
        id: "f20-f21",
        seriesId: "1-series",
        code: "F20/F21",
        name: "Second Generation",
        yearStart: 2011,
        yearEnd: 2019,
        models: [
          { id: "116i-f20", generationId: "f20-f21", name: "116i" },
          { id: "118i-f20", generationId: "f20-f21", name: "118i" },
          { id: "120i-f20", generationId: "f20-f21", name: "120i" },
          { id: "125i-f20", generationId: "f20-f21", name: "125i" },
          { id: "m135i-f20", generationId: "f20-f21", name: "M135i" },
          { id: "m140i-f20", generationId: "f20-f21", name: "M140i" },
        ],
      },
      {
        id: "f40",
        seriesId: "1-series",
        code: "F40",
        name: "Third Generation",
        yearStart: 2019,
        yearEnd: null,
        models: [
          { id: "118i-f40", generationId: "f40", name: "118i" },
          { id: "120i-f40", generationId: "f40", name: "120i" },
          { id: "128ti-f40", generationId: "f40", name: "128ti" },
          { id: "m135i-f40", generationId: "f40", name: "M135i xDrive" },
        ],
      },
    ],
  },
  {
    id: "2-series",
    name: "2 Series",
    slug: "2-series",
    generations: [
      {
        id: "f22-f23",
        seriesId: "2-series",
        code: "F22/F23",
        name: "Coupe/Convertible",
        yearStart: 2014,
        yearEnd: 2021,
        models: [
          { id: "220i-f22", generationId: "f22-f23", name: "220i" },
          { id: "228i-f22", generationId: "f22-f23", name: "228i" },
          { id: "230i-f22", generationId: "f22-f23", name: "230i" },
          { id: "m235i-f22", generationId: "f22-f23", name: "M235i" },
          { id: "m240i-f22", generationId: "f22-f23", name: "M240i" },
          { id: "m2-f87", generationId: "f22-f23", name: "M2" },
          { id: "m2c-f87", generationId: "f22-f23", name: "M2 Competition" },
          { id: "m2cs-f87", generationId: "f22-f23", name: "M2 CS" },
        ],
      },
      {
        id: "f44",
        seriesId: "2-series",
        code: "F44",
        name: "Gran Coupe",
        yearStart: 2020,
        yearEnd: null,
        models: [
          { id: "218i-f44", generationId: "f44", name: "218i" },
          { id: "220i-f44", generationId: "f44", name: "220i" },
          { id: "228i-f44", generationId: "f44", name: "228i xDrive" },
          { id: "m235i-f44", generationId: "f44", name: "M235i xDrive" },
        ],
      },
      {
        id: "g42",
        seriesId: "2-series",
        code: "G42",
        name: "Coupe (Current)",
        yearStart: 2022,
        yearEnd: null,
        models: [
          { id: "220i-g42", generationId: "g42", name: "220i" },
          { id: "230i-g42", generationId: "g42", name: "230i" },
          { id: "m240i-g42", generationId: "g42", name: "M240i xDrive" },
          { id: "m2-g87", generationId: "g42", name: "M2" },
        ],
      },
    ],
  },
  {
    id: "3-series",
    name: "3 Series",
    slug: "3-series",
    generations: [
      {
        id: "e36",
        seriesId: "3-series",
        code: "E36",
        name: "Third Generation",
        yearStart: 1990,
        yearEnd: 2000,
        models: [
          { id: "316i-e36", generationId: "e36", name: "316i" },
          { id: "318i-e36", generationId: "e36", name: "318i" },
          { id: "320i-e36", generationId: "e36", name: "320i" },
          { id: "323i-e36", generationId: "e36", name: "323i" },
          { id: "325i-e36", generationId: "e36", name: "325i" },
          { id: "328i-e36", generationId: "e36", name: "328i" },
          { id: "m3-e36", generationId: "e36", name: "M3" },
        ],
      },
      {
        id: "e46",
        seriesId: "3-series",
        code: "E46",
        name: "Fourth Generation",
        yearStart: 1998,
        yearEnd: 2006,
        models: [
          { id: "316i-e46", generationId: "e46", name: "316i" },
          { id: "318i-e46", generationId: "e46", name: "318i" },
          { id: "320i-e46", generationId: "e46", name: "320i" },
          { id: "323i-e46", generationId: "e46", name: "323i" },
          { id: "325i-e46", generationId: "e46", name: "325i" },
          { id: "328i-e46", generationId: "e46", name: "328i" },
          { id: "330i-e46", generationId: "e46", name: "330i" },
          { id: "m3-e46", generationId: "e46", name: "M3" },
        ],
      },
      {
        id: "e90-e91-e92-e93",
        seriesId: "3-series",
        code: "E90/E91/E92/E93",
        name: "Fifth Generation",
        yearStart: 2005,
        yearEnd: 2013,
        models: [
          { id: "316i-e90", generationId: "e90-e91-e92-e93", name: "316i" },
          { id: "318i-e90", generationId: "e90-e91-e92-e93", name: "318i" },
          { id: "320i-e90", generationId: "e90-e91-e92-e93", name: "320i" },
          { id: "323i-e90", generationId: "e90-e91-e92-e93", name: "323i" },
          { id: "325i-e90", generationId: "e90-e91-e92-e93", name: "325i" },
          { id: "328i-e90", generationId: "e90-e91-e92-e93", name: "328i" },
          { id: "330i-e90", generationId: "e90-e91-e92-e93", name: "330i" },
          { id: "335i-e90", generationId: "e90-e91-e92-e93", name: "335i" },
          { id: "m3-e90", generationId: "e90-e91-e92-e93", name: "M3" },
        ],
      },
      {
        id: "f30-f31-f34",
        seriesId: "3-series",
        code: "F30/F31/F34",
        name: "Sixth Generation",
        yearStart: 2012,
        yearEnd: 2019,
        models: [
          { id: "316i-f30", generationId: "f30-f31-f34", name: "316i" },
          { id: "318i-f30", generationId: "f30-f31-f34", name: "318i" },
          { id: "320i-f30", generationId: "f30-f31-f34", name: "320i" },
          { id: "328i-f30", generationId: "f30-f31-f34", name: "328i" },
          { id: "330i-f30", generationId: "f30-f31-f34", name: "330i" },
          { id: "335i-f30", generationId: "f30-f31-f34", name: "335i" },
          { id: "340i-f30", generationId: "f30-f31-f34", name: "340i" },
        ],
      },
      {
        id: "g20-g21",
        seriesId: "3-series",
        code: "G20/G21",
        name: "Seventh Generation",
        yearStart: 2019,
        yearEnd: null,
        models: [
          { id: "318i-g20", generationId: "g20-g21", name: "318i" },
          { id: "320i-g20", generationId: "g20-g21", name: "320i" },
          { id: "330i-g20", generationId: "g20-g21", name: "330i" },
          { id: "330e-g20", generationId: "g20-g21", name: "330e" },
          { id: "m340i-g20", generationId: "g20-g21", name: "M340i" },
          { id: "m3-g80", generationId: "g20-g21", name: "M3" },
          { id: "m3c-g80", generationId: "g20-g21", name: "M3 Competition" },
        ],
      },
    ],
  },
  {
    id: "4-series",
    name: "4 Series",
    slug: "4-series",
    generations: [
      {
        id: "f32-f33-f36",
        seriesId: "4-series",
        code: "F32/F33/F36",
        name: "First Generation",
        yearStart: 2014,
        yearEnd: 2020,
        models: [
          { id: "420i-f32", generationId: "f32-f33-f36", name: "420i" },
          { id: "428i-f32", generationId: "f32-f33-f36", name: "428i" },
          { id: "430i-f32", generationId: "f32-f33-f36", name: "430i" },
          { id: "435i-f32", generationId: "f32-f33-f36", name: "435i" },
          { id: "440i-f32", generationId: "f32-f33-f36", name: "440i" },
          { id: "m4-f82", generationId: "f32-f33-f36", name: "M4" },
          { id: "m4gts-f82", generationId: "f32-f33-f36", name: "M4 GTS" },
          { id: "m4cs-f82", generationId: "f32-f33-f36", name: "M4 CS" },
        ],
      },
      {
        id: "g22-g23-g26",
        seriesId: "4-series",
        code: "G22/G23/G26",
        name: "Second Generation",
        yearStart: 2020,
        yearEnd: null,
        models: [
          { id: "420i-g22", generationId: "g22-g23-g26", name: "420i" },
          { id: "430i-g22", generationId: "g22-g23-g26", name: "430i" },
          { id: "m440i-g22", generationId: "g22-g23-g26", name: "M440i" },
          { id: "m4-g82", generationId: "g22-g23-g26", name: "M4" },
          { id: "m4c-g82", generationId: "g22-g23-g26", name: "M4 Competition" },
          { id: "m4csl-g82", generationId: "g22-g23-g26", name: "M4 CSL" },
        ],
      },
    ],
  },
  {
    id: "5-series",
    name: "5 Series",
    slug: "5-series",
    generations: [
      {
        id: "e39",
        seriesId: "5-series",
        code: "E39",
        name: "Fourth Generation",
        yearStart: 1996,
        yearEnd: 2003,
        models: [
          { id: "520i-e39", generationId: "e39", name: "520i" },
          { id: "523i-e39", generationId: "e39", name: "523i" },
          { id: "525i-e39", generationId: "e39", name: "525i" },
          { id: "528i-e39", generationId: "e39", name: "528i" },
          { id: "530i-e39", generationId: "e39", name: "530i" },
          { id: "535i-e39", generationId: "e39", name: "535i" },
          { id: "540i-e39", generationId: "e39", name: "540i" },
          { id: "m5-e39", generationId: "e39", name: "M5" },
        ],
      },
      {
        id: "e60-e61",
        seriesId: "5-series",
        code: "E60/E61",
        name: "Fifth Generation",
        yearStart: 2003,
        yearEnd: 2010,
        models: [
          { id: "520i-e60", generationId: "e60-e61", name: "520i" },
          { id: "523i-e60", generationId: "e60-e61", name: "523i" },
          { id: "525i-e60", generationId: "e60-e61", name: "525i" },
          { id: "530i-e60", generationId: "e60-e61", name: "530i" },
          { id: "535i-e60", generationId: "e60-e61", name: "535i" },
          { id: "540i-e60", generationId: "e60-e61", name: "540i" },
          { id: "545i-e60", generationId: "e60-e61", name: "545i" },
          { id: "550i-e60", generationId: "e60-e61", name: "550i" },
          { id: "m5-e60", generationId: "e60-e61", name: "M5" },
        ],
      },
      {
        id: "f10-f11",
        seriesId: "5-series",
        code: "F10/F11",
        name: "Sixth Generation",
        yearStart: 2010,
        yearEnd: 2017,
        models: [
          { id: "520i-f10", generationId: "f10-f11", name: "520i" },
          { id: "528i-f10", generationId: "f10-f11", name: "528i" },
          { id: "530i-f10", generationId: "f10-f11", name: "530i" },
          { id: "535i-f10", generationId: "f10-f11", name: "535i" },
          { id: "540i-f10", generationId: "f10-f11", name: "540i" },
          { id: "550i-f10", generationId: "f10-f11", name: "550i" },
          { id: "m5-f10", generationId: "f10-f11", name: "M5" },
        ],
      },
      {
        id: "g30-g31",
        seriesId: "5-series",
        code: "G30/G31",
        name: "Seventh Generation",
        yearStart: 2017,
        yearEnd: 2023,
        models: [
          { id: "520i-g30", generationId: "g30-g31", name: "520i" },
          { id: "530i-g30", generationId: "g30-g31", name: "530i" },
          { id: "530e-g30", generationId: "g30-g31", name: "530e" },
          { id: "540i-g30", generationId: "g30-g31", name: "540i" },
          { id: "m550i-g30", generationId: "g30-g31", name: "M550i" },
          { id: "m5-f90", generationId: "g30-g31", name: "M5" },
          { id: "m5c-f90", generationId: "g30-g31", name: "M5 Competition" },
          { id: "m5cs-f90", generationId: "g30-g31", name: "M5 CS" },
        ],
      },
      {
        id: "g60",
        seriesId: "5-series",
        code: "G60",
        name: "Eighth Generation",
        yearStart: 2024,
        yearEnd: null,
        models: [
          { id: "520i-g60", generationId: "g60", name: "520i" },
          { id: "530i-g60", generationId: "g60", name: "530i xDrive" },
          { id: "540i-g60", generationId: "g60", name: "540i xDrive" },
          { id: "m5-g90", generationId: "g60", name: "M5" },
        ],
      },
    ],
  },
  {
    id: "6-series",
    name: "6 Series",
    slug: "6-series",
    generations: [
      {
        id: "e63-e64",
        seriesId: "6-series",
        code: "E63/E64",
        name: "Second Generation",
        yearStart: 2003,
        yearEnd: 2010,
        models: [
          { id: "630i-e63", generationId: "e63-e64", name: "630i" },
          { id: "645ci-e63", generationId: "e63-e64", name: "645Ci" },
          { id: "650i-e63", generationId: "e63-e64", name: "650i" },
          { id: "m6-e63", generationId: "e63-e64", name: "M6" },
        ],
      },
      {
        id: "f06-f12-f13",
        seriesId: "6-series",
        code: "F06/F12/F13",
        name: "Third Generation",
        yearStart: 2011,
        yearEnd: 2018,
        models: [
          { id: "640i-f12", generationId: "f06-f12-f13", name: "640i" },
          { id: "650i-f12", generationId: "f06-f12-f13", name: "650i" },
          { id: "m6-f12", generationId: "f06-f12-f13", name: "M6" },
        ],
      },
      {
        id: "g32",
        seriesId: "6-series",
        code: "G32",
        name: "Gran Turismo",
        yearStart: 2017,
        yearEnd: null,
        models: [
          { id: "630i-g32", generationId: "g32", name: "630i GT" },
          { id: "640i-g32", generationId: "g32", name: "640i GT xDrive" },
        ],
      },
    ],
  },
  {
    id: "7-series",
    name: "7 Series",
    slug: "7-series",
    generations: [
      {
        id: "e38",
        seriesId: "7-series",
        code: "E38",
        name: "Third Generation",
        yearStart: 1994,
        yearEnd: 2001,
        models: [
          { id: "728i-e38", generationId: "e38", name: "728i" },
          { id: "735i-e38", generationId: "e38", name: "735i" },
          { id: "740i-e38", generationId: "e38", name: "740i" },
          { id: "750i-e38", generationId: "e38", name: "750i" },
        ],
      },
      {
        id: "e65-e66",
        seriesId: "7-series",
        code: "E65/E66",
        name: "Fourth Generation",
        yearStart: 2001,
        yearEnd: 2008,
        models: [
          { id: "730i-e65", generationId: "e65-e66", name: "730i" },
          { id: "735i-e65", generationId: "e65-e66", name: "735i" },
          { id: "740i-e65", generationId: "e65-e66", name: "740i" },
          { id: "745i-e65", generationId: "e65-e66", name: "745i" },
          { id: "750i-e65", generationId: "e65-e66", name: "750i" },
          { id: "760i-e65", generationId: "e65-e66", name: "760i" },
        ],
      },
      {
        id: "f01-f02",
        seriesId: "7-series",
        code: "F01/F02",
        name: "Fifth Generation",
        yearStart: 2008,
        yearEnd: 2015,
        models: [
          { id: "730i-f01", generationId: "f01-f02", name: "730i" },
          { id: "740i-f01", generationId: "f01-f02", name: "740i" },
          { id: "750i-f01", generationId: "f01-f02", name: "750i" },
          { id: "760i-f01", generationId: "f01-f02", name: "760i" },
        ],
      },
      {
        id: "g11-g12",
        seriesId: "7-series",
        code: "G11/G12",
        name: "Sixth Generation",
        yearStart: 2015,
        yearEnd: 2022,
        models: [
          { id: "730i-g11", generationId: "g11-g12", name: "730i" },
          { id: "740i-g11", generationId: "g11-g12", name: "740i" },
          { id: "745e-g11", generationId: "g11-g12", name: "745e" },
          { id: "750i-g11", generationId: "g11-g12", name: "750i" },
          { id: "m760i-g11", generationId: "g11-g12", name: "M760i" },
        ],
      },
      {
        id: "g70",
        seriesId: "7-series",
        code: "G70",
        name: "Seventh Generation",
        yearStart: 2023,
        yearEnd: null,
        models: [
          { id: "735i-g70", generationId: "g70", name: "735i" },
          { id: "740i-g70", generationId: "g70", name: "740i" },
          { id: "760i-g70", generationId: "g70", name: "760i xDrive" },
          { id: "i7-g70", generationId: "g70", name: "i7 xDrive60" },
        ],
      },
    ],
  },
  {
    id: "8-series",
    name: "8 Series",
    slug: "8-series",
    generations: [
      {
        id: "e31",
        seriesId: "8-series",
        code: "E31",
        name: "First Generation",
        yearStart: 1990,
        yearEnd: 1999,
        models: [
          { id: "840ci-e31", generationId: "e31", name: "840Ci" },
          { id: "850ci-e31", generationId: "e31", name: "850Ci" },
          { id: "850csi-e31", generationId: "e31", name: "850CSi" },
        ],
      },
      {
        id: "g14-g15-g16",
        seriesId: "8-series",
        code: "G14/G15/G16",
        name: "Second Generation",
        yearStart: 2018,
        yearEnd: null,
        models: [
          { id: "840i-g15", generationId: "g14-g15-g16", name: "840i" },
          { id: "m850i-g15", generationId: "g14-g15-g16", name: "M850i" },
          { id: "m8-f91", generationId: "g14-g15-g16", name: "M8" },
          { id: "m8c-f91", generationId: "g14-g15-g16", name: "M8 Competition" },
        ],
      },
    ],
  },
  {
    id: "x1",
    name: "X1",
    slug: "x1",
    generations: [
      {
        id: "e84",
        seriesId: "x1",
        code: "E84",
        name: "First Generation",
        yearStart: 2009,
        yearEnd: 2015,
        models: [
          { id: "x1-18i-e84", generationId: "e84", name: "sDrive18i" },
          { id: "x1-20i-e84", generationId: "e84", name: "sDrive20i" },
          { id: "x1-25i-e84", generationId: "e84", name: "xDrive25i" },
          { id: "x1-28i-e84", generationId: "e84", name: "xDrive28i" },
        ],
      },
      {
        id: "f48",
        seriesId: "x1",
        code: "F48",
        name: "Second Generation",
        yearStart: 2015,
        yearEnd: 2022,
        models: [
          { id: "x1-18i-f48", generationId: "f48", name: "sDrive18i" },
          { id: "x1-20i-f48", generationId: "f48", name: "sDrive20i" },
          { id: "x1-25i-f48", generationId: "f48", name: "xDrive25i" },
        ],
      },
      {
        id: "u11",
        seriesId: "x1",
        code: "U11",
        name: "Third Generation",
        yearStart: 2023,
        yearEnd: null,
        models: [
          { id: "x1-20-u11", generationId: "u11", name: "sDrive20" },
          { id: "x1-23-u11", generationId: "u11", name: "xDrive23" },
          { id: "ix1-u11", generationId: "u11", name: "iX1 xDrive30" },
        ],
      },
    ],
  },
  {
    id: "x2",
    name: "X2",
    slug: "x2",
    generations: [
      {
        id: "f39",
        seriesId: "x2",
        code: "F39",
        name: "First Generation",
        yearStart: 2018,
        yearEnd: 2023,
        models: [
          { id: "x2-18i-f39", generationId: "f39", name: "sDrive18i" },
          { id: "x2-20i-f39", generationId: "f39", name: "sDrive20i" },
          { id: "x2-m35i-f39", generationId: "f39", name: "M35i" },
        ],
      },
      {
        id: "u10",
        seriesId: "x2",
        code: "U10",
        name: "Second Generation",
        yearStart: 2024,
        yearEnd: null,
        models: [
          { id: "x2-20-u10", generationId: "u10", name: "sDrive20" },
          { id: "x2-m35i-u10", generationId: "u10", name: "M35i xDrive" },
          { id: "ix2-u10", generationId: "u10", name: "iX2 xDrive30" },
        ],
      },
    ],
  },
  {
    id: "x3",
    name: "X3",
    slug: "x3",
    generations: [
      {
        id: "e83",
        seriesId: "x3",
        code: "E83",
        name: "First Generation",
        yearStart: 2003,
        yearEnd: 2010,
        models: [
          { id: "x3-20i-e83", generationId: "e83", name: "2.0i" },
          { id: "x3-25i-e83", generationId: "e83", name: "2.5i" },
          { id: "x3-30i-e83", generationId: "e83", name: "3.0i" },
        ],
      },
      {
        id: "f25",
        seriesId: "x3",
        code: "F25",
        name: "Second Generation",
        yearStart: 2010,
        yearEnd: 2017,
        models: [
          { id: "x3-20i-f25", generationId: "f25", name: "xDrive20i" },
          { id: "x3-28i-f25", generationId: "f25", name: "xDrive28i" },
          { id: "x3-35i-f25", generationId: "f25", name: "xDrive35i" },
        ],
      },
      {
        id: "g01",
        seriesId: "x3",
        code: "G01",
        name: "Third Generation",
        yearStart: 2017,
        yearEnd: 2024,
        models: [
          { id: "x3-20i-g01", generationId: "g01", name: "sDrive20i" },
          { id: "x3-30i-g01", generationId: "g01", name: "xDrive30i" },
          { id: "x3-m40i-g01", generationId: "g01", name: "M40i" },
          { id: "x3m-f97", generationId: "g01", name: "X3 M" },
          { id: "x3mc-f97", generationId: "g01", name: "X3 M Competition" },
        ],
      },
      {
        id: "g45",
        seriesId: "x3",
        code: "G45",
        name: "Fourth Generation",
        yearStart: 2025,
        yearEnd: null,
        models: [
          { id: "x3-30-g45", generationId: "g45", name: "xDrive30" },
          { id: "x3-m50-g45", generationId: "g45", name: "M50 xDrive" },
        ],
      },
    ],
  },
  {
    id: "x4",
    name: "X4",
    slug: "x4",
    generations: [
      {
        id: "f26",
        seriesId: "x4",
        code: "F26",
        name: "First Generation",
        yearStart: 2014,
        yearEnd: 2018,
        models: [
          { id: "x4-20i-f26", generationId: "f26", name: "xDrive20i" },
          { id: "x4-28i-f26", generationId: "f26", name: "xDrive28i" },
          { id: "x4-35i-f26", generationId: "f26", name: "xDrive35i" },
          { id: "x4-m40i-f26", generationId: "f26", name: "M40i" },
        ],
      },
      {
        id: "g02",
        seriesId: "x4",
        code: "G02",
        name: "Second Generation",
        yearStart: 2018,
        yearEnd: null,
        models: [
          { id: "x4-20i-g02", generationId: "g02", name: "xDrive20i" },
          { id: "x4-30i-g02", generationId: "g02", name: "xDrive30i" },
          { id: "x4-m40i-g02", generationId: "g02", name: "M40i" },
          { id: "x4m-f98", generationId: "g02", name: "X4 M" },
          { id: "x4mc-f98", generationId: "g02", name: "X4 M Competition" },
        ],
      },
    ],
  },
  {
    id: "x5",
    name: "X5",
    slug: "x5",
    generations: [
      {
        id: "e53",
        seriesId: "x5",
        code: "E53",
        name: "First Generation",
        yearStart: 1999,
        yearEnd: 2006,
        models: [
          { id: "x5-30i-e53", generationId: "e53", name: "3.0i" },
          { id: "x5-44i-e53", generationId: "e53", name: "4.4i" },
          { id: "x5-46is-e53", generationId: "e53", name: "4.6is" },
          { id: "x5-48is-e53", generationId: "e53", name: "4.8is" },
        ],
      },
      {
        id: "e70",
        seriesId: "x5",
        code: "E70",
        name: "Second Generation",
        yearStart: 2006,
        yearEnd: 2013,
        models: [
          { id: "x5-30i-e70", generationId: "e70", name: "xDrive30i" },
          { id: "x5-35i-e70", generationId: "e70", name: "xDrive35i" },
          { id: "x5-48i-e70", generationId: "e70", name: "xDrive48i" },
          { id: "x5-50i-e70", generationId: "e70", name: "xDrive50i" },
          { id: "x5m-e70", generationId: "e70", name: "X5 M" },
        ],
      },
      {
        id: "f15",
        seriesId: "x5",
        code: "F15",
        name: "Third Generation",
        yearStart: 2013,
        yearEnd: 2018,
        models: [
          { id: "x5-25i-f15", generationId: "f15", name: "sDrive25i" },
          { id: "x5-35i-f15", generationId: "f15", name: "xDrive35i" },
          { id: "x5-40e-f15", generationId: "f15", name: "xDrive40e" },
          { id: "x5-50i-f15", generationId: "f15", name: "xDrive50i" },
          { id: "x5m-f85", generationId: "f15", name: "X5 M" },
        ],
      },
      {
        id: "g05",
        seriesId: "x5",
        code: "G05",
        name: "Fourth Generation",
        yearStart: 2019,
        yearEnd: null,
        models: [
          { id: "x5-40i-g05", generationId: "g05", name: "xDrive40i" },
          { id: "x5-45e-g05", generationId: "g05", name: "xDrive45e" },
          { id: "x5-50e-g05", generationId: "g05", name: "xDrive50e" },
          { id: "x5-m50i-g05", generationId: "g05", name: "M50i" },
          { id: "x5m-f95", generationId: "g05", name: "X5 M" },
          { id: "x5mc-f95", generationId: "g05", name: "X5 M Competition" },
        ],
      },
    ],
  },
  {
    id: "x6",
    name: "X6",
    slug: "x6",
    generations: [
      {
        id: "e71",
        seriesId: "x6",
        code: "E71",
        name: "First Generation",
        yearStart: 2008,
        yearEnd: 2014,
        models: [
          { id: "x6-35i-e71", generationId: "e71", name: "xDrive35i" },
          { id: "x6-50i-e71", generationId: "e71", name: "xDrive50i" },
          { id: "x6m-e71", generationId: "e71", name: "X6 M" },
        ],
      },
      {
        id: "f16",
        seriesId: "x6",
        code: "F16",
        name: "Second Generation",
        yearStart: 2014,
        yearEnd: 2019,
        models: [
          { id: "x6-35i-f16", generationId: "f16", name: "xDrive35i" },
          { id: "x6-50i-f16", generationId: "f16", name: "xDrive50i" },
          { id: "x6m-f86", generationId: "f16", name: "X6 M" },
        ],
      },
      {
        id: "g06",
        seriesId: "x6",
        code: "G06",
        name: "Third Generation",
        yearStart: 2020,
        yearEnd: null,
        models: [
          { id: "x6-40i-g06", generationId: "g06", name: "xDrive40i" },
          { id: "x6-m50i-g06", generationId: "g06", name: "M50i" },
          { id: "x6m-f96", generationId: "g06", name: "X6 M" },
          { id: "x6mc-f96", generationId: "g06", name: "X6 M Competition" },
        ],
      },
    ],
  },
  {
    id: "x7",
    name: "X7",
    slug: "x7",
    generations: [
      {
        id: "g07",
        seriesId: "x7",
        code: "G07",
        name: "First Generation",
        yearStart: 2019,
        yearEnd: null,
        models: [
          { id: "x7-40i-g07", generationId: "g07", name: "xDrive40i" },
          { id: "x7-m50i-g07", generationId: "g07", name: "M50i" },
          { id: "x7-m60i-g07", generationId: "g07", name: "M60i" },
        ],
      },
    ],
  },
  {
    id: "z4",
    name: "Z4",
    slug: "z4",
    generations: [
      {
        id: "e85-e86",
        seriesId: "z4",
        code: "E85/E86",
        name: "First Generation",
        yearStart: 2002,
        yearEnd: 2008,
        models: [
          { id: "z4-25i-e85", generationId: "e85-e86", name: "2.5i" },
          { id: "z4-30i-e85", generationId: "e85-e86", name: "3.0i" },
          { id: "z4-30si-e85", generationId: "e85-e86", name: "3.0si" },
          { id: "z4m-e85", generationId: "e85-e86", name: "Z4 M" },
        ],
      },
      {
        id: "e89",
        seriesId: "z4",
        code: "E89",
        name: "Second Generation",
        yearStart: 2009,
        yearEnd: 2016,
        models: [
          { id: "z4-23i-e89", generationId: "e89", name: "sDrive23i" },
          { id: "z4-30i-e89", generationId: "e89", name: "sDrive30i" },
          { id: "z4-35i-e89", generationId: "e89", name: "sDrive35i" },
          { id: "z4-35is-e89", generationId: "e89", name: "sDrive35is" },
        ],
      },
      {
        id: "g29",
        seriesId: "z4",
        code: "G29",
        name: "Third Generation",
        yearStart: 2019,
        yearEnd: null,
        models: [
          { id: "z4-20i-g29", generationId: "g29", name: "sDrive20i" },
          { id: "z4-30i-g29", generationId: "g29", name: "sDrive30i" },
          { id: "z4-m40i-g29", generationId: "g29", name: "M40i" },
        ],
      },
    ],
  },
  {
    id: "i-series",
    name: "i Series (Electric)",
    slug: "i-series",
    generations: [
      {
        id: "i3-i01",
        seriesId: "i-series",
        code: "I01",
        name: "i3",
        yearStart: 2013,
        yearEnd: 2022,
        models: [
          { id: "i3-i01", generationId: "i3-i01", name: "i3" },
          { id: "i3s-i01", generationId: "i3-i01", name: "i3s" },
        ],
      },
      {
        id: "i4-g26",
        seriesId: "i-series",
        code: "G26",
        name: "i4",
        yearStart: 2022,
        yearEnd: null,
        models: [
          { id: "i4-35-g26", generationId: "i4-g26", name: "eDrive35" },
          { id: "i4-40-g26", generationId: "i4-g26", name: "eDrive40" },
          { id: "i4-m50-g26", generationId: "i4-g26", name: "M50" },
        ],
      },
      {
        id: "ix-i20",
        seriesId: "i-series",
        code: "I20",
        name: "iX",
        yearStart: 2022,
        yearEnd: null,
        models: [
          { id: "ix-40-i20", generationId: "ix-i20", name: "xDrive40" },
          { id: "ix-50-i20", generationId: "ix-i20", name: "xDrive50" },
          { id: "ix-m60-i20", generationId: "ix-i20", name: "M60" },
        ],
      },
      {
        id: "i5-g60",
        seriesId: "i-series",
        code: "G60",
        name: "i5",
        yearStart: 2024,
        yearEnd: null,
        models: [
          { id: "i5-40-g60", generationId: "i5-g60", name: "eDrive40" },
          { id: "i5-m60-g60", generationId: "i5-g60", name: "M60 xDrive" },
        ],
      },
    ],
  },
];

// Helper functions
export function getSeriesById(seriesId: string): BMWSeries | undefined {
  return bmwVehicles.find((s) => s.id === seriesId);
}

export function getGenerationById(generationId: string): {
  series: BMWSeries;
  generation: import("@/types").BMWGeneration;
} | undefined {
  for (const series of bmwVehicles) {
    const generation = series.generations.find((g) => g.id === generationId);
    if (generation) {
      return { series, generation };
    }
  }
  return undefined;
}

export function getModelById(modelId: string): {
  series: BMWSeries;
  generation: import("@/types").BMWGeneration;
  model: import("@/types").BMWModel;
} | undefined {
  for (const series of bmwVehicles) {
    for (const generation of series.generations) {
      const model = generation.models.find((m) => m.id === modelId);
      if (model) {
        return { series, generation, model };
      }
    }
  }
  return undefined;
}

export function getYearsForGeneration(generation: import("@/types").BMWGeneration): number[] {
  const endYear = generation.yearEnd || new Date().getFullYear();
  const years: number[] = [];
  for (let year = generation.yearStart; year <= endYear; year++) {
    years.push(year);
  }
  return years;
}

export function formatVehicleString(
  series: BMWSeries,
  generation: import("@/types").BMWGeneration,
  model: import("@/types").BMWModel,
  year: number
): string {
  return `${year} BMW ${series.name} ${model.name} (${generation.code})`;
}
