// UPDATEED /LATEST

return (
    <div className="flex flex-col lg:flex-row gap-6 px-4 lg:mt-14 lg:h-fit justify-center">
        {/* LEFT: Location List */}
        <div className={`w-full lg:w-1/5 flex-col h-[40vh] lg:h-fit ${submitted ? 'lg:flex' : 'hidden'}`}>
            <div className="sticky top-0 z-20 bg-gradient-to-r dark:from-green-800 dark:to-green-600/50 from-green-800/80 to-green-600 text-white font-semibold p-4 rounded-t-md shadow-md">
                <p className="text-xs lg:text-sm uppercase tracking-wider">
                    Guess the Location
                </p>
            </div>
            <div className="flex flex-col gap-2 h-full overflow-y-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-b-md p-4 shadow-inner">
                {submitted && typedText.length !== 0 ? (
                    locationName.map((path, index) => {
                        const isCurrentStep = index === currentStep
                        const isLocationCorrect = correctGuesses.some(([id]) => id === path)

                        return (
                            <div
                                key={index}
                                ref={(el) => {
                                    itemRefs.current[index] = el
                                }}
                                className={`flex items-center gap-3 p-3 border rounded-md transition-all cursor-pointer group
                  ${isCurrentStep ? "bg-green-200 dark:bg-green-700 border-green-400 dark:border-green-500" :
                                        isLocationCorrect ? "bg-green-100 dark:bg-green-600 border-green-300 dark:border-green-500" :
                                            "bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"}
                  hover:bg-green-100 dark:hover:bg-green-600`}
                            >
                                <MapPin className={`text-retro-orange transition-all  w-6 h-6 hidden`} />
                                <TypingText
                                    text={path}
                                    isSubmitted={true}
                                    isMasked={false}
                                    className="text-xs sm:text-xs capitalize"
                                />
                            </div>
                        )
                    })
                ) : (
                    <div className="text-center text-sm italic text-gray-400">
                        <TypingText
                            text={provinceOutline.toString()}
                            isSubmitted={submitted}
                            isMasked={true}
                            className={`lg:text-sm py-4  px-2 text-xs text-shadow-xs ${!submitted
                                ? "text-gray-500/0 dark:text-white/40"
                                : "text-accent"
                                }`}
                        />
                    </div>
                )}
            </div>
        </div>

        {/* RIGHT: Map Display*/}
        <div className="w-full lg:w-2/3 h-[80vh] flex flex-col space-y-1.5">
            {/* Map */}
            <div className="w-full h-[60vh] py-5 overflow-hidden bg-transparent border relative border-gray-300 dark:border-gray-700 rounded-lg shadow-lg flex flex-col items-center justify-between">
                {/* Province Name */}
                <div className="absolute left-0 top-0 z-50 py-4 px-4">
                    <TypingText
                        text={provinceOutline}
                        isSubmitted={submitted}
                        isMasked={true}
                        upperCase={true}
                        className={`text-sm lg:text-xl text-shadow ${submitted ? "dark:text-retro-purple text-retro-mint" : "text-white"}`}
                    />
                </div>

                {/* Next Province Button */}
                <button
                    onClick={(e) => {
                        (e.currentTarget as HTMLButtonElement).blur()
                        handleNextProvince()
                    }}
                    className="absolute top-1 right-1  hover:outline-1 outline-gray-500/50 w-auto dark:text-gray-400 dark:hover:text-gray-100 text-white/80 hover:text-white px-4 py-4 rounded-md cursor-pointer z-50"
                >
                    <RotateCcw width={20} height={20} />
                </button>

                {/* Province Map */}
                <div className="relative w-full h-full flex items-center justify-center p-2">
                    {submitted && !showMap ? (
                        <ProvinceSkeleton />
                    ) : (
                        provinceOutline &&
                        UniquePath &&
                        UniquePath[provinceOutline] && (
                            <MapSVG
                                provinceName={provinceOutline}
                                pathsData={UniquePath}
                                mode="guess"
                                isSubmitted={submitted}
                                correctGuesses={correctGuesses}
                                onPathClick={handlePathClick}
                            />
                        )
                    )}
                </div>
            </div>

            <div className="flex flex-col w-full h-fit border">
                {!submitted && (
                    <div className="flex flex-col w-full items-center gap-4 p-2 relative">
                        {/* Typing Squares */}
                        <div className="flex flex-wrap gap-1 justify-center border">
                            {provinceOutline.split("").map((char, i) => (
                                <div
                                    key={i}
                                    className={`w-9 h-9 md:w-12 md:h-12 border-2 flex items-center justify-center text-center text-sm lg:text-lg font-bold uppercase
            ${char === "_"
                                            ? "border-transparent bg-transparent"
                                            : typedText[i]
                                                ? "dark:border-white/20 dark:bg-slate-600 bg-white text-slate-600 dark:text-white border-white/40 shadow text-shadow-2xs"
                                                : "dark:border-gray-600 dark:bg-slate-700 bg-slate-300 border-white/60 shadow"
                                        }`}
                                >
                                    {char === "_" ? (
                                        <span className="w-9 h-9 md:w-12 md:h-12 border-b-2 dark:border-gray-600 border-gray-100" />
                                    ) : (
                                        typedText[i] || ""
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Mobile Keyboard */}
                        {isMobile && (
                            <div className="fixed bottom-0 left-0 right-0 z-50 w-full">
                                <Keyboard
                                    value={typedText}
                                    onType={setTypedText}
                                    limit={provinceOutline.length}
                                    onSubmit={handleSubmit}
                                    provinceValue={provinceOutline}
                                />
                            </div>
                        )}
                    </div>
                )}




                {/* Next Province Button */}
                {isCompleted && (
                    <div className="w-full flex items-center justify-center py-4">
                        <button
                            ref={nextButtonRef}
                            onClick={() => handleNextProvince()}
                            className="cursor-pointer p-4 text-sm dark:bg-green-800 bg-green-600 w-full lg:w-fit rounded"
                        >
                            Next Province
                        </button>
                    </div>
                )}
            </div>
        </div>
    </div>

)



// OLD STYLE
return (
    <div className="flex min-h-screen w-full">
        <main className="w-full lg:container flex flex-col mx-auto lg:pt-14 ">
            <div className="flex flex-col lg:flex-row w-full h-full gap-2 lg:gap-0">
                {/* Sidebar (Location List) */}
                <div className="w-[99%] mx-auto lg:w-fit lg:h-fit p-2 rounded lg:border-gray-300 dark:lg:border-gray-700 lg:bg-slate-200 dark:lg:bg-gray-800 lg:border-2">
                    <h2 className="text-xs lg:text-sm text-white bg-green-400/50 px-4 py-2 rounded-t-md text-shadow-2xs whitespace-nowrap ">
                        Guess the {!submitted ? "Province" : "Location"}
                    </h2>

                    <div className="bg-slate-50 dark:bg-gray-700/50 border border-gray-600/30 shadow">
                        <TypingText
                            text={provinceOutline.toString()}
                            isSubmitted={submitted}
                            isMasked={true}
                            className={`lg:text-sm py-4  px-2 text-xs text-shadow-xs ${!submitted
                                ? "text-gray-500/0 dark:text-white/40"
                                : "text-accent"
                                }`}
                        />

                        {submitted && typedText.length !== 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <hr className="text-gray-400/60" />
                                <ul className="flex lg:flex-col px-1 py-2 space-x-1 gap-1 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
                                    {locationName.map((path, index) => {
                                        const isCurrentStep = index === currentStep
                                        const isLocationCorrect = correctGuesses.some(
                                            ([id]) => id === path
                                        )
                                        return (
                                            <li
                                                key={index}
                                                ref={el => {
                                                    itemRefs.current[index] = el
                                                }}
                                                className={`snap-center shadow rounded ${isCurrentStep ? "lg:animate-breathing" : ""
                                                    }`}
                                            >
                                                <TypingText
                                                    text={path}
                                                    isSubmitted={true}
                                                    isMasked={false}
                                                    className={`lg:text-sm p-2 text-xs text-shadow-xs rounded w-full flex items-center justify-center lg:block lg:items-start h-full whitespace-nowrap  
                            ${isCurrentStep
                                                            ? "text-gray-500 dark:text-white bg-gray-300/80 dark:bg-gray-400/50"
                                                            : isLocationCorrect
                                                                ? "btn-bg-accent text-accent"
                                                                : "text-gray-400/20 dark:text-white/40 "
                                                        }`}
                                                />
                                            </li>
                                        )
                                    })}
                                </ul>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Main Content (Map and Typing Area) */}
                <div className="flex flex-col w-full lg:min-h-0 space-y-5 px-2">
                    {/* Province Outline */}
                    <div
                        className={`w-full relative border-2 px-2 dark:border-gray-600 border-slate-300 rounded lg:py-4 lg:my-0 my-2 
              ${!submitted ? "h-[50vh] lg:h-[75vh] px-10 flex-5/12 lg:flex-none" : "h-full lg:h-[80vh] "
                            }`}
                    >
                        <button
                            onClick={(e) => {
                                (e.currentTarget as HTMLButtonElement).blur()
                                handleNextProvince()
                            }}
                            className="absolute w-auto dark:text-gray-400 dark:hover:text-gray-100 text-white/80 hover:text-white px-4 py-3 rounded cursor-pointer top-0 right-0 z-50"
                        >
                            <RotateCcw width={20} height={20} />
                        </button>

                        {submitted && !showMap ? (
                            <ProvinceSkeleton />
                        ) : (
                            provinceOutline &&
                            UniquePath &&
                            UniquePath[provinceOutline] && (
                                <MapSVG
                                    provinceName={provinceOutline}
                                    pathsData={UniquePath}
                                    mode="guess"
                                    isSubmitted={submitted}
                                    correctGuesses={correctGuesses}
                                    onPathClick={handlePathClick}
                                />
                            )
                        )}
                    </div>

                    {/* Typing section */}
                    {!submitted && (
                        <>
                            <div className="flex flex-wrap gap-1 justify-center">
                                {provinceOutline.split("").map((char, i) => (
                                    <div
                                        key={i}
                                        className={`w-9 h-9 md:w-12 md:h-12 border-2 flex items-center justify-center text-center text-sm lg:text-lg font-bold uppercase lg:mt-4 mt-2
                      ${char === "_"
                                                ? "border-transparent bg-transparent"
                                                : typedText[i]
                                                    ? "dark:border-white/20 dark:bg-slate-600 bg-white text-slate-600 dark:text-white border-white/40 shadow text-shadow-2xs"
                                                    : "dark:border-gray-600 dark:bg-slate-700 bg-slate-300 border-white/60 shadow"
                                            }`}
                                    >
                                        {char === "_" ? (
                                            <span className="w-9 h-9 md:w-12 md:h-12 border-b-2 lg:flex items-center justify-center text-sm dark:border-gray-600 border-gray-100" />
                                        ) : (
                                            typedText[i] || ""
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Mobile Keyboard at bottom */}
                            <div
                                className={`mx-auto w-full ${isMobile ? "mb-2" : "hidden"} lg:static lg:w-fit`}>
                                <Keyboard
                                    value={typedText}
                                    onType={setTypedText}
                                    limit={provinceOutline.length}
                                    onSubmit={handleSubmit}
                                    provinceValue={provinceOutline}
                                />
                            </div>
                        </>
                    )}

                    {/* Next Province button if guess complete */}
                    {isCompleted && (
                        <div className="w-full flex items-center justify-center py-4">
                            <button ref={nextButtonRef} onClick={() => { handleNextProvince() }} className="cursor-pointer p-4 text-sm dark:bg-green-800 bg-green-600 w-full lg:w-fit rounded">
                                Next Province
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    </div>

)