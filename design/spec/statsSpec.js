/*
    Calcs required to get macro stats to be tested in this script.
    - lbs > kg = / 2.2
    - BMR = (body weight (kg) * 10) + (height (cm) * 6.25) - (5 * age (yrs)) + 5
    - TDEE = BMR * 1.5
    - Maintain calories (MC) = TDEE
    - Maintain macros = prot(MC*0.3) | carb(MC*0.45) | fat(MC*0.25) 
    - Cut calories (CC) = TDEE / 0.75
    - Maintain macros = prot(CC*0.4) | carb(CC*0.40) | fat(CC*0.20)
    - Bulk calories (BC) = TDEE * 1.1
    - Maintain macros = prot(BC*0.25) | carb(BC*0.55) | fat(BC*0.20)
*/

describe("Calculate all Macros and total calories", function(){
    describe("BMR calc test", function(){
        it("should return 1755", function(){
            expect(bmrCalc(39, 82, 180)).toBe(1755);
        });
        it("should return 1718", function(){
            expect(bmrCalc(40, 85, 170)).toBe(1718);
        });
        it("should return an error if args are not numbers", function(){
            expect(bmrCalc(40, "jam", false)).toBe("Please provide all of your stats as numbers.");
        });
        it("should return an error if some args are missing", function(){
            expect(bmrCalc(40)).toBe("Please provide all of your stats as numbers.");
        });
        it("should return an error if negative numbers are used", function(){
            expect(bmrCalc(40, -180, 78)).toBe("Please make sure you are not using negative numbers");
        });
    });
    describe("TDEE calc test", function(){
        it("should return 2577", function(){
            expect(tdeeCalc(1718)).toBe(2577);
        });
        it("should return 2510", function(){
            expect(tdeeCalc(1673)).toBe(2510);
        });
    });
    describe("Macros calc test", function(){
        var goal = "build";
        
        if(goal === "build"){
            it("should return 188", function(){
                expect(macrosCalc(2510)).toEqual([2510, 173, 380, 61]);
            });
            it("should return 282", function(){
                expect(macrosCalc(2678)).toEqual([2678, 184, 405, 65]);
            });    
        }
        else if(goal === "cut"){
            it("should return 188", function(){
                expect(macrosCalc(2510)).toEqual([2510, 188, 188, 42]);
            });
            it("should return 282", function(){
                expect(macrosCalc(2678)).toEqual([2678, 201, 201, 45]);
            });
        }
        else {
            it("should return 188", function(){
                expect(macrosCalc(2510)).toEqual([2510, 188, 282, 70]);
            });
            it("should return 282", function(){
                expect(macrosCalc(2678)).toEqual([2678, 201, 301, 74]);
            });
        };
    });
});