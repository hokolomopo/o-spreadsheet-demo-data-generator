export const FN_DATA = {};

// -------- UNIQUE --------------
FN_DATA.UNIQUE = {};
FN_DATA.UNIQUE.DATA = [
    [1, 2],
    [1, 2],
];
FN_DATA.UNIQUE.RESULT = [
    [1, 2],
]
FN_DATA.UNIQUE.ARGS = ["$"]

// -------- EXPAND --------------
FN_DATA.EXPAND = {};
FN_DATA.EXPAND.DATA = [
    [1],
];
FN_DATA.EXPAND.RESULT = [
    [1, 0],
    [0, 0],
]
FN_DATA.EXPAND.ARGS = ["$", 2, 2, 0]

// -------- FILTER --------------
FN_DATA.FILTER = {};
FN_DATA.FILTER.DATA = [
    [1, 2],
    [0, 4],
];
FN_DATA.FILTER.RESULT = [
    [1, 2],
]
FN_DATA.FILTER.ARGS = ["$", "$COL_0"]

// -------- TRANSPOSE --------------
FN_DATA.TRANSPOSE = {};
FN_DATA.TRANSPOSE.DATA = [
    [1, 2],
    [3, 4],
];
FN_DATA.TRANSPOSE.RESULT = [
    [1, 3],
    [2, 4],
]
FN_DATA.TRANSPOSE.ARGS = ["$"]

// -------- MUNIT --------------
FN_DATA.MUNIT = {};
FN_DATA.MUNIT.DATA = [[]
];
FN_DATA.MUNIT.RESULT = [
    [1, 0],
    [0, 1],
]
FN_DATA.MUNIT.ARGS = [2]

// -------- FLATTEN --------------
FN_DATA.FLATTEN = {};
FN_DATA.FLATTEN.DATA = [
    [1, 2],
    [3, 4],
];
FN_DATA.FLATTEN.RESULT = [
    [1],
    [2],[3],[4],
]
FN_DATA.FLATTEN.ARGS = ["$"]

// -------- FREQUENCY --------------
FN_DATA.FREQUENCY = {};
FN_DATA.FREQUENCY.DATA = [
    [1, 2],
    [0, 4],
];
FN_DATA.FREQUENCY.RESULT = [
    [3],
    [1],
]
FN_DATA.FREQUENCY.ARGS = ["$", 2]

// -------- ARRAY.CONSTRAIN --------------
FN_DATA.ARRAY_CONSTRAIN = {};
FN_DATA.ARRAY_CONSTRAIN.DATA = [
    [1, 2],
    [3, 4],
];
FN_DATA.ARRAY_CONSTRAIN.RESULT = [
    [1],
    [3],
]
FN_DATA.ARRAY_CONSTRAIN.ARGS = ["$", 2, 1]

// -------- CHOOSECOLS --------------
FN_DATA.CHOOSECOLS = {};
FN_DATA.CHOOSECOLS.DATA = [
    [1, 2],
    [3, 4],
];
FN_DATA.CHOOSECOLS.RESULT = [
    [2],
    [4],
]
FN_DATA.CHOOSECOLS.ARGS = ["$", 2]

// -------- CHOOSEROWS --------------
FN_DATA.CHOOSEROWS = {};
FN_DATA.CHOOSEROWS.DATA = [
    [1, 2],
    [3, 4],
];
FN_DATA.CHOOSEROWS.RESULT = [
    [3, 4],
]
FN_DATA.CHOOSEROWS.ARGS = ["$", 2]

// -------- SUMPRODUCT --------------
FN_DATA.SUMPRODUCT = {};
FN_DATA.SUMPRODUCT.DATA = [
    [1, 2],
    [3, 4],
];
FN_DATA.SUMPRODUCT.RESULT = [
    [14],
]
FN_DATA.SUMPRODUCT.ARGS = ["$COL_0", "$COL_1"]

// -------- MINVERSE --------------
FN_DATA.MINVERSE = {};
FN_DATA.MINVERSE.DATA = [
    [1, 2],
    [3, 4],
];
FN_DATA.MINVERSE.RESULT = [
    [-2, 1],
    [1.5, -0.5],
]
FN_DATA.MINVERSE.ARGS = ["$"]

// -------- MDETERM --------------
FN_DATA.MDETERM = {};
FN_DATA.MDETERM.DATA = [
    [1, 2],
    [3, 4],
];
FN_DATA.MDETERM.RESULT = [
    [-2],
]
FN_DATA.MDETERM.ARGS = ["$"]

// -------- MMULT --------------
FN_DATA.MMULT = {};
FN_DATA.MMULT.DATA = [
    [1, 2],
    [3, 4],
];
FN_DATA.MMULT.RESULT = [
    [7, 10],
    [15, 22],
]
FN_DATA.MMULT.ARGS = ["$", "$"]

// -------- SUMX2MY2 --------------
FN_DATA.SUMX2MY2 = {};
FN_DATA.SUMX2MY2.DATA = [
    [1, 2],
    [3, 4],
];
FN_DATA.SUMX2MY2.RESULT = [
    [-10],
]
FN_DATA.SUMX2MY2.ARGS = ["$COL_0", "$COL_1"]

// -------- SUMX2PY2 --------------
FN_DATA.SUMX2PY2 = {};
FN_DATA.SUMX2PY2.DATA = [
    [1, 2],
    [3, 4],
];
FN_DATA.SUMX2PY2.RESULT = [
    [30],
]
FN_DATA.SUMX2PY2.ARGS = ["$COL_0", "$COL_1"]

// -------- SUMXMY2 --------------
FN_DATA.SUMXMY2 = {};
FN_DATA.SUMXMY2.DATA = [
    [1, 2],
    [3, 4],
];
FN_DATA.SUMXMY2.RESULT = [
    [2],
]
FN_DATA.SUMXMY2.ARGS = ["$COL_0", "$COL_1"]

// -------- TOCOL --------------
FN_DATA.TOCOL = {};
FN_DATA.TOCOL.DATA = [
    [1, 2],
    [3, 4],
];
FN_DATA.TOCOL.RESULT = [
    [1],
    [2],
    [3],
    [4],
]
FN_DATA.TOCOL.ARGS = ["$"]

// -------- TOROWs --------------
FN_DATA.TOROW = {};
FN_DATA.TOROW.DATA = [
    [1, 2],
    [3, 4],
];
FN_DATA.TOROW.RESULT = [
    [1, 2, 3, 4],
]
FN_DATA.TOROW.ARGS = ["$"]

// -------- SPLIT --------------
FN_DATA.SPLIT = {};
FN_DATA.SPLIT.DATA = [
    ["Hello there; General Kenobi"],
];
FN_DATA.SPLIT.RESULT = [
    ["Hello", "there;", "General", "Kenobi"],
]
FN_DATA.SPLIT.ARGS = ["$", " "]

// -------- HSTACK --------------
FN_DATA.HSTACK = {};
FN_DATA.HSTACK.DATA = [
    [1, 2],
    [3, 4],
];
FN_DATA.HSTACK.RESULT = [
    [1, 2, 3, 4],
]
FN_DATA.HSTACK.ARGS = ["$ROW_0", "$ROW_1"]

// -------- VSTACK --------------
FN_DATA.VSTACK = {};
FN_DATA.VSTACK.DATA = [
    [1, 2],
    [3, 4],
];
FN_DATA.VSTACK.RESULT = [
    [1],
    [3],
    [2],
    [4]
]
FN_DATA.VSTACK.ARGS = ["$COL_0", "$COL_1"]

// -------- WRAPCOLS --------------
FN_DATA.WRAPCOLS = {};
FN_DATA.WRAPCOLS.DATA = [
    [1],
    [3],
];
FN_DATA.WRAPCOLS.RESULT = [
    [1],
    [3],
    [0],
]
FN_DATA.WRAPCOLS.ARGS = ["$", 3, 0]

// -------- WRAPROWS --------------
FN_DATA.WRAPROWS = {};
FN_DATA.WRAPROWS.DATA = [
    [1],
    [3],
];
FN_DATA.WRAPROWS.RESULT = [
    [1, 3, 0],
]
FN_DATA.WRAPROWS.ARGS = ["$", 3, 0]
