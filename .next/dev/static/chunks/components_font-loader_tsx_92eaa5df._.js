(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/font-loader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FontLoader",
    ()=>FontLoader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
function FontLoader() {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FontLoader.useEffect": ()=>{
            // Check if link already exists
            const existingLink = document.querySelector('link[href*="gilroy"]');
            if (existingLink) return;
            // Add preconnect
            const preconnect = document.createElement('link');
            preconnect.rel = 'preconnect';
            preconnect.href = 'https://fonts.cdnfonts.com';
            preconnect.crossOrigin = 'anonymous';
            document.head.appendChild(preconnect);
            // Add font stylesheet
            const link = document.createElement('link');
            link.href = 'https://fonts.cdnfonts.com/css/gilroy';
            link.rel = 'stylesheet';
            document.head.appendChild(link);
        }
    }["FontLoader.useEffect"], []);
    return null;
}
_s(FontLoader, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = FontLoader;
var _c;
__turbopack_context__.k.register(_c, "FontLoader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_font-loader_tsx_92eaa5df._.js.map