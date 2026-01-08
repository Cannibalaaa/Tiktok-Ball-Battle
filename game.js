// Ball Battle Arena - Main Game File
class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.balls = [];
        this.projectiles = [];
        this.visualEffects = [];
        this.ccDodgeMessages = []; // Messages for CC dodge text
        this.cancelledMessages = []; // Messages for cancelled moves
        this.gameState = 'selection'; // selection, playing, gameOver
        this.lastFrameTime = performance.now(); // Track frame timing for delta time

        // Load images
        this.images = {};
        this.loadImages();

        // Load sounds
        this.sounds = {};
        this.loadSounds();

        this.currentSelectionStep = 'names';
        this.player1 = null;
        this.player2 = null;
        this.selectedRace1 = null;
        this.selectedRace2 = null;
        this.selectedWeapon1 = null;
        this.selectedWeapon2 = null;
        this.selectedAttack1 = null;
        this.selectedAttack2 = null;
        this.selectedSkill1 = null;
        this.selectedSkill2 = null;
        this.selectedUltimate1 = null;
        this.selectedUltimate2 = null;


        this.init();
    }

    init() {
        this.setupEventListeners();
        this.showSelectionScreen();
    }

    loadImages() {
        const imagePaths = {
            'sword': 'basic attack/sword.png',
            'dualSword': 'basic attack/dual sword.png',
            'bloodEffect': 'effects/blood effect.png',
            'axeThrow': 'Basic Skill/Axe Throw.png',
            'frenziedSlash': 'Basic Skill/Frenzied Slash.png',
            'warStomp': 'Basic Skill/War Stomp_01.png',
            'warStompFrame1': 'Basic Skill/War Stomp_01.png',
            'warStompFrame2': 'Basic Skill/War Stomp_02.png',
            'warStompFrame3': 'Basic Skill/War Stomp_03.png',
            'warStompFrame4': 'Basic Skill/War Stomp_04.png',
            'warStompFrame5': 'Basic Skill/War Stomp_05.png',
            'battleFocus': 'Basic Skill/Battle Focus.png',
            'executionStrike': 'Basic Skill/Execution Strike.png',
            'shieldBash': 'Basic Skill/Shield Bash.png',
            'arrowStorm': 'Basic Skill/arrow_storm_frame_3.png',
            'arrowStormFrame1': 'Basic Skill/arrow_storm_frame_1.png',
            'arrowStormFrame2': 'Basic Skill/arrow_storm_frame_2.png',
            'arrowStormFrame3': 'Basic Skill/arrow_storm_frame_3.png',
            'arrowStormFrame4': 'Basic Skill/arrow_storm_frame_4.png',
            'arrowStormFrame5': 'Basic Skill/arrow_storm_frame_5.png',
            'arrowStormFrame6': 'Basic Skill/arrow_storm_frame_6.png',
            'arrowStormFrame7': 'Basic Skill/arrow_storm_frame_7.png',
            'arrowStormFrame8': 'Basic Skill/arrow_storm_frame_8.png',
            'naturesGrasp': 'Basic Skill/natures_grasp_frame_3.png',
            'naturesGraspFrame1': 'Basic Skill/natures_grasp_frame_1.png',
            'naturesGraspFrame2': 'Basic Skill/natures_grasp_frame_2.png',
            'naturesGraspFrame3': 'Basic Skill/natures_grasp_frame_3.png',
            'naturesGraspFrame4': 'Basic Skill/natures_grasp_frame_4.png',
            'naturesGraspFrame5': 'Basic Skill/natures_grasp_frame_5.png',
            'naturesGraspFrame6': 'Basic Skill/natures_grasp_frame_6.png',
            'shadowstep': 'Basic Skill/shadowstep_frame_4.png',
            'shadowstepFrame1': 'Basic Skill/shadowstep_frame_1.png',
            'shadowstepFrame2': 'Basic Skill/shadowstep_frame_2.png',
            'shadowstepFrame3': 'Basic Skill/shadowstep_frame_3.png',
            'shadowstepFrame4': 'Basic Skill/shadowstep_frame_4.png',
            'shadowstepFrame5': 'Basic Skill/shadowstep_frame_5.png',
            'shadowstepFrame6': 'Basic Skill/shadowstep_frame_6.png',
            'shadowstepFrame7': 'Basic Skill/shadowstep_frame_7.png',
            'shadowstepFrame8': 'Basic Skill/shadowstep_frame_8.png',
            'sylvanMark': 'Basic Skill/sylvan_mark_frame_4.png',
            'sylvanMarkFrame1': 'Basic Skill/sylvan_mark_frame_1.png',
            'sylvanMarkFrame2': 'Basic Skill/sylvan_mark_frame_2.png',
            'sylvanMarkFrame3': 'Basic Skill/sylvan_mark_frame_3.png',
            'sylvanMarkFrame4': 'Basic Skill/sylvan_mark_frame_4.png',
            'sylvanMarkFrame5': 'Basic Skill/sylvan_mark_frame_5.png',
            'sylvanMarkFrame6': 'Basic Skill/sylvan_mark_frame_6.png',
            'sylvanMarkFrame7': 'Basic Skill/sylvan_mark_frame_7.png',
            'sylvanMarkFrame8': 'Basic Skill/sylvan_mark_frame_8.png',
            'sylvanMarkArrow': 'Basic Skill/Sylvan Mark Arrow.png',
            'rainOfStarsFrame1': 'Ultimate Skill/Rain_of_Stars_1.png',
            'rainOfStarsFrame2': 'Ultimate Skill/Rain_of_Stars_2.png',
            'rainOfStarsFrame3': 'Ultimate Skill/Rain_of_Stars_3.png',
            'rainOfStarsFrame4': 'Ultimate Skill/Rain_of_Stars_4.png',
            'rainOfStarsFrame5': 'Ultimate Skill/Rain_of_Stars_5.png',
            'flurryOfBlows': 'basic attack/Flurry of Blows.png',
            'ironFist': 'basic attack/iron fist.png',
            'unarmed': 'basic attack/unarmed.png',
            'bow': 'basic attack/bow.png',
            'arrow': 'basic attack/Arrow.png',
            'piercingArrow': 'basic attack/Piercing Arrow.png',
            'staff': 'basic attack/staff.png',
            'crossbow': 'basic attack/crossbow.png',
            'crossbowBolt': 'basic attack/crossbow bolt.png',
            'crossbowExplosiveBolt': 'basic attack/crossbow explosive bolt.png',
            'elementalBurst': 'basic attack/Elemental Burst.png',
            'arcaneBolt': 'basic attack/Arcane Bolt.png',
            'focusedBeam': 'basic attack/Focused Beam.png',
            'infernalChains': 'Basic Skill/chain_root_flicker_frame_01.png',
            'infernalChainsFrame1': 'Basic Skill/chain_root_flicker_frame_01.png',
            'infernalChainsFrame2': 'Basic Skill/chain_root_flicker_frame_02.png',
            'infernalChainsFrame3': 'Basic Skill/chain_root_flicker_frame_03.png',
            'infernalChainsFrame4': 'Basic Skill/chain_root_flicker_frame_04.png',
            'infernalChainsFrame5': 'Basic Skill/chain_root_flicker_frame_05.png',
            'infernalChainsFrame6': 'Basic Skill/chain_root_flicker_frame_06.png',
            'infernalChainsFrame7': 'Basic Skill/chain_root_flicker_frame_07.png',
            'infernalChainsFrame8': 'Basic Skill/chain_root_flicker_frame_08.png',
            'soulLeech': 'Basic Skill/soul_leech_frame_01.png',
            'soulLeechFrame1': 'Basic Skill/soul_leech_frame_01.png',
            'soulLeechFrame2': 'Basic Skill/soul_leech_frame_02.png',
            'soulLeechFrame3': 'Basic Skill/soul_leech_frame_03.png',
            'soulLeechFrame4': 'Basic Skill/soul_leech_frame_04.png',
            'soulLeechFrame5': 'Basic Skill/soul_leech_frame_05.png',
            'soulLeechFrame6': 'Basic Skill/soul_leech_frame_06.png',
            'soulLeechFrame7': 'Basic Skill/soul_leech_frame_07.png',
            'soulLeechFrame8': 'Basic Skill/soul_leech_frame_08.png',
            'hellfireBolt': 'Basic Skill/Hellfire Bolt.png',
            'throwingAxe': 'Basic Skill/throwing axe.png',
            'hammerStrikeFrame1': 'Basic Skill/hammer_strike1.png',
            'hammerStrikeFrame2': 'Basic Skill/hammer_strike2.png',
            'hammerStrikeFrame3': 'Basic Skill/hammer_strike3.png',
            'hammerStrikeFrame4': 'Basic Skill/hammer_strike4.png',
            'hammerStrikeFrame5': 'Basic Skill/hammer_strike5.png',
            'hammerStrikeFrame6': 'Basic Skill/hammer_strike6.png',
            'hammerStrikeFrame7': 'Basic Skill/hammer_strike7.png',
            'hammerStrikeFrame8': 'Basic Skill/hammer_strike8.png',
            'headbutt': 'Basic Skill/Headbutt.png',
            'battleRoarFrame1': 'Basic Skill/battle_roar_1.png',
            'battleRoarFrame2': 'Basic Skill/battle_roar_2.png',
            'battleRoarFrame3': 'Basic Skill/battle_roar_3.png',
            'battleRoarFrame4': 'Basic Skill/battle_roar_4.png',
            'battleRoarFrame5': 'Basic Skill/battle_roar_5.png',
            'battleRoarFrame6': 'Basic Skill/battle_roar_6.png',
            'battleRoarFrame7': 'Basic Skill/battle_roar_7.png',
            'battleRoarFrame8': 'Basic Skill/battle_roar_8.png',
            'bloodFrenzyFrame1': 'Basic Skill/blood_frenzy_1.png',
            'bloodFrenzyFrame2': 'Basic Skill/blood_frenzy_2.png',
            'bloodFrenzyFrame3': 'Basic Skill/blood_frenzy_3.png',
            'bloodFrenzyFrame4': 'Basic Skill/blood_frenzy_4.png',
            'bloodFrenzyFrame5': 'Basic Skill/blood_frenzy_5.png',
            'bloodFrenzyFrame6': 'Basic Skill/blood_frenzy_6.png',
            'bloodFrenzyFrame7': 'Basic Skill/blood_frenzy_7.png',
            'bloodFrenzyFrame8': 'Basic Skill/blood_frenzy_8.png',
            'unbreakableBastionFrame1': 'Ultimate Skill/unbreakable_bastion1.png',
            'unbreakableBastionFrame2': 'Ultimate Skill/unbreakable_bastion2.png',
            'unbreakableBastionFrame3': 'Ultimate Skill/unbreakable_bastion3.png',
            'unbreakableBastionFrame4': 'Ultimate Skill/unbreakable_bastion4.png',
            'hammerOfMountainFrame1': 'Ultimate Skill/hammer_of_the_mountain1.png',
            'hammerOfMountainFrame2': 'Ultimate Skill/hammer_of_the_mountain2.png',
            'hammerOfMountainFrame3': 'Ultimate Skill/hammer_of_the_mountain3.png',
            'hammerOfMountainFrame4': 'Ultimate Skill/hammer_of_the_mountain4.png',
            'hammerOfMountainFrame5': 'Ultimate Skill/hammer_of_the_mountain5.png',
            'hammerOfMountainFrame6': 'Ultimate Skill/hammer_of_the_mountain6.png',
            'wrathOfWarlordFrame1': 'Ultimate Skill/wrath_warlord_1.png',
            'wrathOfWarlordFrame2': 'Ultimate Skill/wrath_warlord_2.png',
            'wrathOfWarlordFrame3': 'Ultimate Skill/wrath_warlord_3.png',
            'wrathOfWarlordFrame4': 'Ultimate Skill/wrath_warlord_4.png',
            'wrathOfWarlordFrame5': 'Ultimate Skill/wrath_warlord_5.png',
            'wrathOfWarlordFrame6': 'Ultimate Skill/wrath_warlord_6.png',
            'wrathOfWarlordFrame7': 'Ultimate Skill/wrath_warlord_7.png',
            'wrathOfWarlordFrame8': 'Ultimate Skill/wrath_warlord_8.png',
            'runeChargeFrame1': 'Basic Skill/rune_charge1.png',
            'runeChargeFrame2': 'Basic Skill/rune_charge2.png',
            'runeChargeFrame3': 'Basic Skill/rune_charge3.png',
            'runeChargeFrame4': 'Basic Skill/rune_charge4.png',
            'fortify': 'Basic Skill/Fortify.png',
            'stoneTossFrame1': 'Basic Skill/stonetoss1.png',
            'stoneTossFrame2': 'Basic Skill/stonetoss2.png',
            'stoneTossFrame3': 'Basic Skill/stonetoss3.png',
            'stoneTossFrame4': 'Basic Skill/stonetoss4.png',
            'stoneTossFrame5': 'Basic Skill/stonetoss5.png',
            'stoneTossFrame6': 'Basic Skill/stonetoss6.png',
            'stoneTossFrame7': 'Basic Skill/stonetoss7.png',
            'stoneTossFrame8': 'Basic Skill/stonetoss8.png',
            'anvilOfMountain': 'Ultimate Skill/anvil of the mountain.png',
            'earthshatter': 'Ultimate Skill/Earthshatter.png',
            'herosWrath': 'Ultimate Skill/Heros Wrath.png',
            'lastStand': 'Ultimate Skill/Last Stand.png',
            'spiritOfForest': 'Ultimate Skill/spirit_of_the_forest.png',
            'demonicAscension': 'Ultimate Skill/Demonic Ascension.png',
            'dreadAura': 'Basic Skill/Dread_aura_1.png',
            'dreadAuraFrame1': 'Basic Skill/Dread_aura_1.png',
            'dreadAuraFrame2': 'Basic Skill/Dread_aura_2.png',
            'dreadAuraFrame3': 'Basic Skill/Dread_aura_3.png',
            'dreadAuraFrame4': 'Basic Skill/Dread_aura_4.png',
            'dreadAuraFrame5': 'Basic Skill/Dread_aura_5.png',
            'dreadAuraFrame6': 'Basic Skill/Dread_aura_6.png',
            'dreadAuraFrame7': 'Basic Skill/Dread_aura_7.png',
            'dreadAuraFrame8': 'Basic Skill/Dread_aura_8.png',
            'apocalypseFlame': 'Ultimate Skill/apocalypse_flame_upward_swirl_01.png',
            'apocalypseFlameFrame1': 'Ultimate Skill/apocalypse_flame_upward_swirl_01.png',
            'apocalypseFlameFrame2': 'Ultimate Skill/apocalypse_flame_upward_swirl_02.png',
            'apocalypseFlameFrame3': 'Ultimate Skill/apocalypse_flame_upward_swirl_03.png',
            'apocalypseFlameFrame4': 'Ultimate Skill/apocalypse_flame_upward_swirl_04.png',
            'apocalypseFlameFrame5': 'Ultimate Skill/apocalypse_flame_upward_swirl_05.png',
            'apocalypseFlameFrame6': 'Ultimate Skill/apocalypse_flame_upward_swirl_06.png',
            'apocalypseFlameFrame7': 'Ultimate Skill/apocalypse_flame_upward_swirl_07.png',
            'apocalypseFlameFrame8': 'Ultimate Skill/apocalypse_flame_upward_swirl_08.png',
            'battleCry': 'Basic Skill/Battle Cry.png',
            'unstoppableRage': 'Ultimate Skill/unstoppable_rage_1.png',
            'unstoppableRageFrame1': 'Ultimate Skill/unstoppable_rage_1.png',
            'unstoppableRageFrame2': 'Ultimate Skill/unstoppable_rage_2.png',
            'unstoppableRageFrame3': 'Ultimate Skill/unstoppable_rage_3.png',
            'unstoppableRageFrame4': 'Ultimate Skill/unstoppable_rage_4.png',
            'unstoppableRageFrame5': 'Ultimate Skill/unstoppable_rage_5.png',
            'unstoppableRageFrame6': 'Ultimate Skill/unstoppable_rage_6.png',
            'unstoppableRageFrame7': 'Ultimate Skill/unstoppable_rage_7.png',
            'unstoppableRageFrame8': 'Ultimate Skill/unstoppable_rage_8.png',
            'earthshatter': 'Ultimate Skill/earthshatter_frame_01.png',
            'earthshatterFrame1': 'Ultimate Skill/earthshatter_frame_01.png',
            'earthshatterFrame2': 'Ultimate Skill/earthshatter_frame_02.png',
            'earthshatterFrame3': 'Ultimate Skill/earthshatter_frame_03.png',
            'earthshatterFrame4': 'Ultimate Skill/earthshatter_frame_04.png',
            'earthshatterFrame5': 'Ultimate Skill/earthshatter_frame_05.png',
            'earthshatterFrame6': 'Ultimate Skill/earthshatter_frame_06.png',
            'earthshatterFrame7': 'Ultimate Skill/earthshatter_frame_07.png',
            'earthshatterFrame8': 'Ultimate Skill/earthshatter_frame_08.png',
            'earthshatterFrame9': 'Ultimate Skill/earthshatter_frame_09.png',
            'earthshatterFrame10': 'Ultimate Skill/earthshatter_frame_10.png',
            'earthshatterFrame11': 'Ultimate Skill/earthshatter_frame_11.png',
            'earthshatterFrame12': 'Ultimate Skill/earthshatter_frame_12.png',
            'heavySlash': 'basic attack/Heavy Slash.png',
            'quickJab': 'basic attack/Quick Jab.png',
            'shieldBreaker': 'basic attack/Shield Breaker.png',
            'twinStrikesFrame1': 'basic attack/twinstrikes_frame_01.png',
            'twinStrikesFrame2': 'basic attack/twinstrikes_frame_02.png',
            'twinStrikesFrame3': 'basic attack/twinstrikes_frame_03.png',
            'twinStrikesFrame4': 'basic attack/twinstrikes_frame_04.png',
            'twinStrikesFrame5': 'basic attack/twinstrikes_frame_05.png',
            'twinStrikesFrame6': 'basic attack/twinstrikes_frame_06.png',
            'twinStrikesFrame7': 'basic attack/twinstrikes_frame_07.png',
            'twinStrikesFrame8': 'basic attack/twinstrikes_frame_08.png',
            'twinStrikesFrame9': 'basic attack/twinstrikes_frame_09.png',
            'whirlwindFrame1': 'basic attack/whirlwind_frame_01.png',
            'whirlwindFrame2': 'basic attack/whirlwind_frame_02.png',
            'whirlwindFrame3': 'basic attack/whirlwind_frame_03.png',
            'whirlwindFrame4': 'basic attack/whirlwind_frame_04.png',
            'whirlwindFrame5': 'basic attack/whirlwind_frame_05.png',
            'whirlwindFrame6': 'basic attack/whirlwind_frame_06.png',
            'whirlwindFrame7': 'basic attack/whirlwind_frame_07.png',
            'whirlwindFrame8': 'basic attack/whirlwind_frame_08.png',
            'whirlwindFrame9': 'basic attack/whirlwind_frame_09.png',
            'whirlwindFrame10': 'basic attack/whirlwind_frame_10.png',
            'whirlwindFrame11': 'basic attack/whirlwind_frame_11.png',
            'whirlwindFrame12': 'basic attack/whirlwind_frame_12.png',

            'regeneration': 'effects/Regeneration.png',
            'eagle1': 'passive skills/eagle1.png',
            'eagle2': 'passive skills/eagle2.png'
        };

        let loadedCount = 0;
        const totalImages = Object.keys(imagePaths).length;

        console.log('Loading images...');
        Object.entries(imagePaths).forEach(([key, path]) => {
            const img = new Image();
            img.onload = () => {
                loadedCount++;
                console.log(`Loaded image: ${key} from ${path}`);
                if (loadedCount === totalImages) {
                    console.log('All images loaded successfully');
                }
            };
            img.onerror = () => {
                console.warn(`Failed to load image: ${path}`);
                loadedCount++;
            };
            img.src = path;
            this.images[key] = img;

        });
    }



    convertSkillIdToSoundName(skillId) {
        // Convert camelCase to Title Case with spaces
        // e.g., "axeThrow" -> "Axe Throw", "hellfireBolt" -> "Hellfire Bolt"
        return skillId
            .replace(/([A-Z])/g, ' $1') // Add space before capital letters
            .replace(/^./, str => str.toUpperCase()) // Capitalize first letter
            .trim();
    }

    loadSounds() {
        // List of all active and ultimate skills that need sound effects
        const skillSounds = [
            // Active Skills
            'axeThrow', 'frenziedSlash', 'warStomp', 'battleCry',
            // Special sound effects
            'Throw', 'Critical_Hit',
            'hammerStrike', 'stoneToss', 'fortify', 'runeCharge',
            'arrowStorm', 'naturesGrasp', 'shadowstep', 'sylvanMark', 'sylvanMarkHit',
            'throwingAxe', 'battleRoar', 'headbutt', 'Headbutt_Collision', 'bloodFrenzy',
            'shieldBash', 'tacticalRoll', 'battleFocus', 'executionStrike',
            'hellfireBolt', 'soulLeech', 'dreadAura', 'infernalChains',
            // Ultimate Skills
            'unstoppableRage', 'earthshatter',
            'anvilOfMountain', 'hammerOfMountain', 'unbreakableBastion',
            'rainOfStars', 'spiritOfForest',
            'wrathOfWarlord', 'unstoppableStrength',
            'lastStand', 'herosWrath',
            'demonicAscension', 'apocalypseFlame'
        ];

        console.log('Loading sounds...');
        let loadedCount = 0;
        const totalSounds = skillSounds.length;

        skillSounds.forEach(skillId => {
            // Handle names with underscores (like "Headbutt_Collision") - use as-is with first letter capitalized
            let soundFileName;
            if (skillId.includes('_')) {
                soundFileName = skillId.charAt(0).toUpperCase() + skillId.slice(1);
            } else {
                soundFileName = this.convertSkillIdToSoundName(skillId);
            }
            const audio = new Audio(`Sound Effects/${soundFileName}.mp3`);
            audio.preload = 'auto';
            audio.oncanplaythrough = () => {
                loadedCount++;
                if (loadedCount === totalSounds) {
                    console.log('All sounds loaded successfully');
                }
            };
            audio.onerror = () => {
                console.warn(`Failed to load sound: Sound Effects/${soundFileName}.mp3`);
                loadedCount++;
            };
            // Store using skillId as key for easy lookup
            this.sounds[skillId] = audio;
        });

        // Load bow-specific sounds
        // Arrow hit body sounds (3 variations)
        for (let i = 1; i <= 3; i++) {
            const audio = new Audio(`Sound Effects/Bow/arrow_hit_body/arrow_hit_body${i}.mp3`);
            audio.preload = 'auto';
            this.sounds[`arrow_hit_body${i}`] = audio;
        }

        // Smooth shoot sounds (3 variations)
        for (let i = 1; i <= 3; i++) {
            const audio = new Audio(`Sound Effects/Bow/smooth_shoot/smooth_shoot${i}.mp3`);
            audio.preload = 'auto';
            this.sounds[`smooth_shoot${i}`] = audio;
        }

        // Load sword-specific sounds
        // Sword draw sound
        const swordDraw = new Audio(`Sound Effects/sword_&_dual_sword/sword_draw.mp3`);
        swordDraw.preload = 'auto';
        this.sounds['sword_draw'] = swordDraw;

        // Dual sword draw sound
        const dualSwordDraw = new Audio(`Sound Effects/sword_&_dual_sword/dual_sword_draw.mp3`);
        dualSwordDraw.preload = 'auto';
        this.sounds['dual_sword_draw'] = dualSwordDraw;

        // Sword hit sounds (11 variations)
        for (let i = 1; i <= 11; i++) {
            const audio = new Audio(`Sound Effects/sword_&_dual_sword/sword_hit${i}.mp3`);
            audio.preload = 'auto';
            this.sounds[`sword_hit${i}`] = audio;
        }

        // Load staff-specific sounds
        // Staff low sounds (10 variations) for Arcane Bolt and Elemental Burst
        for (let i = 1; i <= 10; i++) {
            const audio = new Audio(`Sound Effects/staff/staff_low${i}.mp3`);
            audio.preload = 'auto';
            this.sounds[`staff_low${i}`] = audio;
        }

        // Staff focused beam sounds (4 variations) for Focused Beam
        for (let i = 1; i <= 4; i++) {
            const audio = new Audio(`Sound Effects/staff/staff_focused_beam${i}.mp3`);
            audio.preload = 'auto';
            this.sounds[`staff_focused_beam${i}`] = audio;
        }

        // Staff explosion sounds (5 variations) for Elemental Burst hit
        for (let i = 1; i <= 5; i++) {
            const audio = new Audio(`Sound Effects/staff/staff_explosion${i}.mp3`);
            audio.preload = 'auto';
            this.sounds[`staff_explosion${i}`] = audio;
        }

        // Staff electric sounds (8 variations) for Arcane Bolt hit
        for (let i = 1; i <= 8; i++) {
            const audio = new Audio(`Sound Effects/staff/staff_electric${i}.mp3`);
            audio.preload = 'auto';
            this.sounds[`staff_electric${i}`] = audio;
        }

        // Load crossbow-specific sounds
        // Crossbow hit sounds (3 variations)
        for (let i = 1; i <= 3; i++) {
            const audio = new Audio(`Sound Effects/crossbow/crossbow hit/crossbow_hit${i}.mp3`);
            audio.preload = 'auto';
            this.sounds[`crossbow_hit${i}`] = audio;
        }

        // Crossbow shoot sounds (4 variations)
        for (let i = 1; i <= 4; i++) {
            const audio = new Audio(`Sound Effects/crossbow/crossbow shoot/crossbow_shoot${i}.mp3`);
            audio.preload = 'auto';
            this.sounds[`crossbow_shoot${i}`] = audio;
        }

        // Crossbow explosion sounds (5 variations)
        for (let i = 1; i <= 5; i++) {
            const audio = new Audio(`Sound Effects/crossbow/crossbow explosion/crossbow_explosion${i}.mp3`);
            audio.preload = 'auto';
            this.sounds[`crossbow_explosion${i}`] = audio;
        }

        this.sounds['demonicAscension'] = new Audio('Sound Effects/demonic_ascension.mp3');
        this.sounds['unbreakableBastion'] = new Audio('Sound Effects/unbreakable_bastion.mp3');

        // Passive Skill Sounds
        this.sounds['eagleCall'] = new Audio('Sound Effects/eagle call.mp3');
        this.sounds['eagleFlap'] = new Audio('Sound Effects/eagle flap.mp3');
    }

    playRandomBowShootSound() {
        const soundIndex = Math.floor(Math.random() * 3) + 1;
        this.playSound(`smooth_shoot${soundIndex}`);
    }

    playRandomBowHitSound() {
        const soundIndex = Math.floor(Math.random() * 3) + 1;
        this.playSound(`arrow_hit_body${soundIndex}`);
    }

    playRandomSwordHitSound() {
        const soundIndex = Math.floor(Math.random() * 11) + 1;
        this.playSound(`sword_hit${soundIndex}`);
    }

    playRandomStaffLowSound() {
        const soundIndex = Math.floor(Math.random() * 10) + 1;
        this.playSound(`staff_low${soundIndex}`);
    }

    playRandomStaffFocusedBeamSound() {
        const soundIndex = Math.floor(Math.random() * 4) + 1;
        this.playSound(`staff_focused_beam${soundIndex}`);
    }

    playRandomStaffExplosionSound() {
        const soundIndex = Math.floor(Math.random() * 5) + 1;
        this.playSound(`staff_explosion${soundIndex}`);
    }

    playRandomStaffElectricSound() {
        const soundIndex = Math.floor(Math.random() * 8) + 1;
        this.playSound(`staff_electric${soundIndex}`);
    }

    playRandomCrossbowShootSound() {
        const soundIndex = Math.floor(Math.random() * 4) + 1;
        this.playSound(`crossbow_shoot${soundIndex}`);
    }

    playRandomCrossbowHitSound() {
        const soundIndex = Math.floor(Math.random() * 3) + 1;
        this.playSound(`crossbow_hit${soundIndex}`);
    }

    playRandomCrossbowExplosionSound() {
        const soundIndex = Math.floor(Math.random() * 5) + 1;
        this.playSound(`crossbow_explosion${soundIndex}`);
    }

    playSound(soundName) {
        // Play sound effect if it exists
        if (this.sounds[soundName]) {
            try {
                // Clone the audio to allow overlapping sounds
                const audio = this.sounds[soundName].cloneNode();
                audio.volume = 0.5; // Set volume to 50%
                audio.play().catch(err => {
                    // Ignore play() errors (e.g., user hasn't interacted with page yet)
                    console.warn(`Could not play sound ${soundName}:`, err);
                });
            } catch (err) {
                console.warn(`Error playing sound ${soundName}:`, err);
            }
        }
    }

    setupEventListeners() {
        document.getElementById('nextButton').addEventListener('click', () => this.nextSelectionStep());
        const randomBtn = document.getElementById('randomMatchButton');
        if (randomBtn) {
            randomBtn.addEventListener('click', () => this.startRandomMatch());
        }
    }

    showSelectionScreen() {
        document.getElementById('selectionScreen').classList.remove('hidden');
    }

    hideSelectionScreen() {
        document.getElementById('selectionScreen').classList.add('hidden');
    }

    nextSelectionStep() {
        switch (this.currentSelectionStep) {
            case 'names':
                this.handleNameSelection();
                break;
            case 'race1':
                this.handleRaceSelection(1);
                break;
            case 'race2':
                this.handleRaceSelection(2);
                break;
            case 'passive1':
                this.handlePassiveSelection(1);
                break;
            case 'passive2':
                this.handlePassiveSelection(2);
                break;
            case 'weapon1':
                this.handleWeaponSelection(1);
                break;
            case 'weapon2':
                this.handleWeaponSelection(2);
                break;
            case 'attack1':
                this.handleAttackSelection(1);
                break;
            case 'attack2':
                this.handleAttackSelection(2);
                break;
            case 'skill1':
                this.handleSkillSelection(1);
                break;
            case 'skill2':
                this.handleSkillSelection(2);
                break;
            case 'ultimate1':
                this.handleUltimateSelection(1);
                break;
            case 'ultimate2':
                this.handleUltimateSelection(2);
                break;
            case 'start':
                this.startGame();
                break;
        }
    }

    handleNameSelection() {
        const name1 = document.getElementById('player1Input').value.trim();
        const name2 = document.getElementById('player2Input').value.trim();

        if (!name1 || !name2) {
            alert('Please enter names for both players!');
            return;
        }

        this.player1 = { name: name1 };
        this.player2 = { name: name2 };
        this.currentSelectionStep = 'race1';
        this.showRaceSelection(1);
    }

    showRaceSelection(playerNum) {
        const title = document.getElementById('selectionTitle');
        const content = document.getElementById('selectionContent');

        title.textContent = `${this[`player${playerNum}`].name} - Choose Your Race`;

        const races = [
            { id: 'human', name: 'Human', stats: 'HP: 220, Defense: 0, Crit: 10%' },
            { id: 'demon', name: 'Demon', stats: 'HP: 170, Defense: 1, Crit: 15%' },
            { id: 'orc', name: 'Orc', stats: 'HP: 190, Defense: 1, Crit: 10%' },
            { id: 'elf', name: 'Elf', stats: 'HP: 160, Defense: 2, Crit: 20%' },
            { id: 'dwarf', name: 'Dwarf', stats: 'HP: 200, Defense: 1, Crit: 10%' },
            { id: 'barbarian', name: 'Barbarian', stats: 'HP: 180, Defense: 0, Crit: 20%' }
        ];

        content.innerHTML = `
            <div class="selection-grid">
                ${races.map(race => `
                    <div class="selection-option" data-race="${race.id}">
                        <div class="option-title">${race.name}</div>
                        <div class="option-description">${race.stats}</div>
                    </div>
                `).join('')}
            </div>
            <button class="next-button" id="nextButton" disabled>Next</button>
        `;

        // Add click handlers
        document.querySelectorAll('.selection-option').forEach(option => {
            option.addEventListener('click', () => {
                document.querySelectorAll('.selection-option').forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                document.getElementById('nextButton').disabled = false;
            });
        });

        // Re-setup event listener
        document.getElementById('nextButton').addEventListener('click', () => this.nextSelectionStep());
    }

    handleRaceSelection(playerNum) {
        const selected = document.querySelector('.selection-option.selected');
        if (!selected) {
            alert('Please select a race!');
            return;
        }

        const raceId = selected.dataset.race;
        this[`selectedRace${playerNum}`] = raceId;

        if (playerNum === 1) {
            this.currentSelectionStep = 'passive1';
            this.showPassiveSelection(1);
        } else {
            this.currentSelectionStep = 'passive2';
            this.showPassiveSelection(2);
        }
    }

    showPassiveSelection(playerNum) {
        const title = document.getElementById('selectionTitle');
        const content = document.getElementById('selectionContent');

        title.textContent = `${this[`player${playerNum}`].name} - Choose Your Passive Skill`;

        const race = this[`selectedRace${playerNum}`];
        const passiveSkills = this.getPassiveSkillsForRace(race);

        content.innerHTML = `
            <div class="selection-grid">
                ${passiveSkills.map(skill => `
                    <div class="selection-option" data-passive="${skill.id}">
                        <div class="option-title">${skill.name}</div>
                        <div class="option-description">${skill.description}</div>
                    </div>
                `).join('')}
            </div>
            <button class="next-button" id="nextButton" disabled>Next</button>
        `;

        // Add click handlers
        document.querySelectorAll('.selection-option').forEach(option => {
            option.addEventListener('click', () => {
                document.querySelectorAll('.selection-option').forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                document.getElementById('nextButton').disabled = false;
            });
        });

        // Re-setup event listener
        document.getElementById('nextButton').addEventListener('click', () => this.nextSelectionStep());
    }

    getPassiveSkillsForRace(race) {
        const passiveSkills = {
            human: [
                { id: 'battleHardened', name: 'Battle-Hardened', description: '+1% damage and defense every second' },
                { id: 'tacticalRecall', name: 'Tactical Recall', description: 'Once per game, avoid fatal blow (50% HP)' },
                { id: 'jackOfAllTrades', name: 'Jack of All Trades', description: 'Copy enemy\'s passive skill' },
                { id: 'resourcefulMind', name: 'Resourceful Mind', description: 'Speed boost when health below 50%' }
            ],
            demon: [
                { id: 'soulReaping', name: 'Soul Reaping', description: 'Heal when dealing damage' },
                { id: 'hellfireAura', name: 'Hellfire Aura', description: 'Damage enemies that stay close' },
                { id: 'painEmpowerment', name: 'Pain Empowerment', description: 'More damage as health gets lower' },
                { id: 'corruptedRegeneration', name: 'Corrupted Regeneration', description: 'Heal over time, die if heal >200HP' },
                { id: 'shadowPuppeteer', name: 'Shadow Puppeteer', description: '10% chance to cancel enemy\'s next move' },
                { id: 'bloodPact', name: 'Blood Pact', description: 'Sacrifice HP to stay alive with 1 HP' },
                { id: 'chainsOfDespair', name: 'Chains of Despair', description: 'Reduce enemy cooldown speed' }
            ],
            orc: [
                { id: 'bloodrage', name: 'Bloodrage', description: 'More damage as health gets lower' },
                { id: 'ironhide', name: 'Ironhide', description: '+1 defense' },
                { id: 'boneCrusher', name: 'Bone Crusher', description: '+3 damage against armored enemies' },
                { id: 'unbreakableWill', name: 'Unbreakable Will', description: 'Reduced debuff effects' },
                { id: 'battleScars', name: 'Battle Scars', description: 'Small health regeneration over time' }
            ],
            elf: [
                { id: 'sylvanGrace', name: 'Sylvan Grace', description: '10% chance to dodge attacks' },
                { id: 'manaAffinity', name: 'Mana Affinity', description: '30% faster cooldowns and skill damage' },
                { id: 'forestsBlessing', name: 'Forest\'s Blessing', description: 'Heal when speed is less than 5' },
                { id: 'keenSight', name: 'Keen Sight', description: '30% critical hit chance' },
                { id: 'naturesWhisper', name: 'Nature\'s Whisper', description: 'Speed and accuracy buffs' },
                { id: 'ancientWisdom', name: 'Ancient Wisdom', description: '30% reduced cooldowns' },
                { id: 'spiritBond', name: 'Spirit Bond', description: 'Summon animal spirit for support' }
            ],
            dwarf: [
                { id: 'stoneflesh', name: 'Stoneflesh', description: '+2 physical resistance' },
                { id: 'ironWill', name: 'Iron Will', description: 'Debuffs wear off faster' },
                { id: 'aleFueledResilience', name: 'Ale-Fueled Resilience', description: 'Damage resistance when healing' },
                { id: 'runesmithsBlessing', name: 'Runesmith\'s Blessing', description: '5% chance for weapons to spark with magic' },
                { id: 'deepminersStamina', name: 'Deepminer\'s Stamina', description: 'Fast HP regen when under half health' },
                { id: 'mountainsEndurance', name: 'Mountain\'s Endurance', description: 'Shield when damaging enemies' }
            ],
            barbarian: [
                { id: 'bloodRage', name: 'Blood Rage', description: '20% damage increase when health below 50%' },
                { id: 'berserkersEndurance', name: 'Berserker\'s Endurance', description: 'Heal after taking 3 hits' },
                { id: 'warCry', name: 'War Cry', description: 'Stun nearby enemies on crit' },
                { id: 'savageMomentum', name: 'Savage Momentum', description: 'Consecutive attacks get stronger' },
                { id: 'bonebreaker', name: 'Bonebreaker', description: 'Attacks ignore 2 points of armor' },
                { id: 'huntersInstinct', name: 'Hunter\'s Instinct', description: 'Move faster when chasing low health enemies' },
                { id: 'ragingSpirit', name: 'Raging Spirit', description: 'Final attack before falling' }
            ]
        };

        return passiveSkills[race] || [];
    }

    handlePassiveSelection(playerNum) {
        const selected = document.querySelector('.selection-option.selected');
        if (!selected) {
            alert('Please select a passive skill!');
            return;
        }

        const passiveId = selected.dataset.passive;
        this[`selectedPassive${playerNum}`] = passiveId;

        if (playerNum === 1) {
            this.currentSelectionStep = 'race2';
            this.showRaceSelection(2);
        } else {
            this.currentSelectionStep = 'weapon1';
            this.showWeaponSelection(1);
        }
    }

    showWeaponSelection(playerNum) {
        const title = document.getElementById('selectionTitle');
        const content = document.getElementById('selectionContent');

        title.textContent = `${this[`player${playerNum}`].name} - Choose Your Weapon`;

        const weapons = [
            { id: 'bow', name: '🏹 Bow', description: 'Ranged precision weapon' },
            { id: 'dualSword', name: '⚔️ Dual Sword', description: 'Fast melee combat' },
            { id: 'sword', name: '🗡️ Sword', description: 'Balanced melee weapon' },
            { id: 'staff', name: '🔮 Staff', description: 'Magic-focused weapon' },
            { id: 'crossbow', name: '🎯 Crossbow', description: 'Heavy ranged weapon' },
            { id: 'unarmed', name: '✊ Unarmed', description: 'Hand-to-hand combat' }
        ];

        content.innerHTML = `
            <div class="selection-grid">
                ${weapons.map(weapon => `
                    <div class="selection-option" data-weapon="${weapon.id}">
                        <div class="option-title">${weapon.name}</div>
                        <div class="option-description">${weapon.description}</div>
                    </div>
                `).join('')}
            </div>
            <button class="next-button" id="nextButton" disabled>Next</button>
        `;

        // Add click handlers
        document.querySelectorAll('.selection-option').forEach(option => {
            option.addEventListener('click', () => {
                document.querySelectorAll('.selection-option').forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                document.getElementById('nextButton').disabled = false;
            });
        });

        // Re-setup event listener
        document.getElementById('nextButton').addEventListener('click', () => this.nextSelectionStep());
    }

    handleWeaponSelection(playerNum) {
        const selected = document.querySelector('.selection-option.selected');
        if (!selected) {
            alert('Please select a weapon!');
            return;
        }

        const weaponId = selected.dataset.weapon;
        this[`selectedWeapon${playerNum}`] = weaponId;

        if (playerNum === 1) {
            this.currentSelectionStep = 'weapon2';
            this.showWeaponSelection(2);
        } else {
            this.currentSelectionStep = 'attack1';
            this.showAttackSelection(1);
        }
    }

    showAttackSelection(playerNum) {
        const title = document.getElementById('selectionTitle');
        const content = document.getElementById('selectionContent');

        title.textContent = `${this[`player${playerNum}`].name} - Choose Your Attack Type`;

        const weapon = this[`selectedWeapon${playerNum}`];
        const attacks = this.getAttacksForWeapon(weapon);

        content.innerHTML = `
            <div class="selection-grid">
                ${attacks.map(attack => `
                    <div class="selection-option" data-attack="${attack.id}">
                        <div class="option-title">${attack.name}</div>
                        <div class="option-description">${attack.description}</div>
                    </div>
                `).join('')}
            </div>
            <button class="next-button" id="nextButton" disabled>Next</button>
        `;

        // Add click handlers
        document.querySelectorAll('.selection-option').forEach(option => {
            option.addEventListener('click', () => {
                document.querySelectorAll('.selection-option').forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                document.getElementById('nextButton').disabled = false;
            });
        });

        // Re-setup event listener
        document.getElementById('nextButton').addEventListener('click', () => this.nextSelectionStep());
    }

    getAttacksForWeapon(weapon, race = null) {
        const attackData = {
            bow: [
                { id: 'preciseShot', name: 'Precise Shot', description: '5 damage, 1.2s cooldown' },
                { id: 'volley', name: 'Volley', description: '3 arrows x 3 damage each, 1.2s cooldown' },
                { id: 'piercingArrow', name: 'Piercing Arrow', description: '4 damage, pierces enemies, 1.2s cooldown' }
            ],
            dualSword: [
                { id: 'whirlwindSlash', name: 'Whirlwind Slash', description: '5 damage, 1.2s cooldown' },
                { id: 'twinStrikes', name: 'Twin Strikes', description: '3 damage x2 hits, 1.2s cooldown' },
                { id: 'bleedingCuts', name: 'Bleeding Cuts', description: '3 damage + 1 bleed/s for 2s, 1.2s cooldown' }
            ],
            sword: [
                { id: 'heavySlash', name: 'Heavy Slash', description: '7 damage, 1.2s cooldown' },
                { id: 'quickJab', name: 'Quick Jab', description: '4 damage, 30% double hit, 1.2s cooldown' },
                { id: 'shieldBreaker', name: 'Shield Breaker', description: '5 damage, ignores defense, 1.2s cooldown' }
            ],
            staff: [
                { id: 'arcaneBolt', name: 'Arcane Bolt', description: '5 damage, 1.2s cooldown' },
                { id: 'elementalBurst', name: 'Elemental Burst', description: '5 damage, ignores defense, 1.2s cooldown' },
                { id: 'focusedBeam', name: 'Focused Beam', description: '4 damage beam, 3s cooldown' }
            ],
            crossbow: [
                { id: 'sniperBolt', name: 'Sniper Bolt', description: '6 damage, 1.2s cooldown' },
                { id: 'scatterShot', name: 'Scatter Shot', description: '3 damage x2 bolts, 1.2s cooldown' },
                { id: 'explosiveBolt', name: 'Explosive Bolt', description: '4 damage AOE, 1.2s cooldown' }
            ],
            unarmed: [
                { id: 'ironFist', name: 'Iron Fist', description: '4 damage, 1.2s cooldown' },
                { id: 'flurryOfBlows', name: 'Flurry of Blows', description: '2 damage x3 hits, 1.2s cooldown' },
                { id: 'grappleSlam', name: 'Grapple Slam', description: '5 damage, 1.2s cooldown' }
            ]
        };

        return attackData[weapon] || [];
    }

    handleAttackSelection(playerNum) {
        const selected = document.querySelector('.selection-option.selected');
        if (!selected) {
            alert('Please select an attack type!');
            return;
        }

        const attackId = selected.dataset.attack;
        this[`selectedAttack${playerNum}`] = attackId;

        if (playerNum === 1) {
            this.currentSelectionStep = 'attack2';
            this.showAttackSelection(2);
        } else {
            this.currentSelectionStep = 'skill1';
            this.showSkillSelection(1);
        }
    }

    showSkillSelection(playerNum) {
        const title = document.getElementById('selectionTitle');
        const content = document.getElementById('selectionContent');

        title.textContent = `${this[`player${playerNum}`].name} - Choose Your Active Skill`;

        const skills = this.getAllActiveSkills();

        content.innerHTML = `
            <div class="selection-grid">
                ${skills.map(skill => `
                    <div class="selection-option" data-skill="${skill.id}">
                        <div class="option-title">${skill.name}</div>
                        <div class="option-description">${skill.description}</div>
                    </div>
                `).join('')}
            </div>
            <button class="next-button" id="nextButton" disabled>Next</button>
        `;

        // Add click handlers
        document.querySelectorAll('.selection-option').forEach(option => {
            option.addEventListener('click', () => {
                document.querySelectorAll('.selection-option').forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                document.getElementById('nextButton').disabled = false;
            });
        });

        // Re-setup event listener
        document.getElementById('nextButton').addEventListener('click', () => this.nextSelectionStep());
    }

    getAllActiveSkills() {
        return [
            // Barbarian
            { id: 'axeThrow', name: 'Axe Throw', description: '8 damage projectile' },
            { id: 'frenziedSlash', name: 'Frenzied Slash', description: '3x3 damage projectile (9 total)' },
            { id: 'warStomp', name: 'War Stomp', description: '8 damage + 0.8s stun on collision' },
            { id: 'battleCry', name: 'Battle Cry', description: '+25% attack speed, +3 damage for 3s' },

            // Dwarf
            { id: 'hammerStrike', name: 'Hammer Strike', description: '5 damage + 1s stun projectile' },
            { id: 'stoneToss', name: 'Stone Toss', description: '6 damage + 1 burn/s for 3s' },
            { id: 'fortify', name: 'Fortify', description: '3 stacks of 50% damage reduction' },
            { id: 'runeCharge', name: 'Rune Charge', description: '3 stacks of +50% damage bonus' },

            // Elf
            { id: 'arrowStorm', name: 'Arrow Storm', description: '10 damage projectile, 100px range' },
            { id: 'naturesGrasp', name: 'Nature\'s Grasp', description: '1.5s root' },
            { id: 'shadowstep', name: 'Shadowstep', description: '+5 damage on next attack' },
            { id: 'sylvanMark', name: 'Sylvan Mark', description: '15 damage projectile (delayed)' },

            // Orc
            { id: 'throwingAxe', name: 'Throwing Axe', description: '7 damage projectile' },
            { id: 'battleRoar', name: 'Battle Roar', description: '3 stacks: +2 dmg self, -2 dmg enemy' },
            { id: 'headbutt', name: 'Headbutt', description: '4 damage + 0.8s stun on collision' },
            { id: 'bloodFrenzy', name: 'Blood Frenzy', description: '3 stacks of 50% lifesteal' },

            // Human
            { id: 'shieldBash', name: 'Shield Bash', description: '5 damage + 0.8s stun + 3 def for 3s' },
            { id: 'tacticalRoll', name: 'Tactical Roll', description: '2x speed for 1.5s' },
            { id: 'battleFocus', name: 'Battle Focus', description: '3 stacks of +70% crit chance' },
            { id: 'executionStrike', name: 'Execution Strike', description: '3 stacks: +3/+6 dmg based on enemy HP' },

            // Demon
            { id: 'hellfireBolt', name: 'Hellfire Bolt', description: '7 damage projectile' },
            { id: 'soulLeech', name: 'Soul Leech', description: '4 damage + heal 2 HP' },
            { id: 'dreadAura', name: 'Dread Aura', description: '10 damage + 0.7s taunt (1.2s wave)' },
            { id: 'infernalChains', name: 'Infernal Chains', description: '8 damage + 1s root (skillshot)' }
        ];
    }

    handleSkillSelection(playerNum) {
        const selected = document.querySelector('.selection-option.selected');
        if (!selected) {
            alert('Please select a skill!');
            return;
        }

        const skillId = selected.dataset.skill;
        this[`selectedSkill${playerNum}`] = skillId;

        if (playerNum === 1) {
            this.currentSelectionStep = 'skill2';
            this.showSkillSelection(2);
        } else {
            this.currentSelectionStep = 'ultimate1';
            this.showUltimateSelection(1);
        }
    }

    showUltimateSelection(playerNum) {
        const title = document.getElementById('selectionTitle');
        const content = document.getElementById('selectionContent');

        title.textContent = `${this[`player${playerNum}`].name} - Choose Your Ultimate Skill`;

        const ultimates = this.getAllUltimateSkills();

        content.innerHTML = `
            <div class="selection-grid">
                ${ultimates.map(ultimate => `
                    <div class="selection-option" data-ultimate="${ultimate.id}">
                        <div class="option-title">${ultimate.name}</div>
                        <div class="option-description">${ultimate.description}</div>
                    </div>
                `).join('')}
            </div>
            <button class="next-button" id="nextButton" disabled>Next</button>
        `;

        // Add click handlers
        document.querySelectorAll('.selection-option').forEach(option => {
            option.addEventListener('click', () => {
                document.querySelectorAll('.selection-option').forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                document.getElementById('nextButton').disabled = false;
            });
        });

        // Re-setup event listener
        document.getElementById('nextButton').addEventListener('click', () => this.nextSelectionStep());
    }

    getAllUltimateSkills() {
        return [
            // Barbarian
            { id: 'unstoppableRage', name: 'Unstoppable Rage', description: '+50% damage, +25% attack speed for 3s' },
            { id: 'earthshatter', name: 'Earthshatter', description: '12 damage + 1.5s stun (leap attack)' },

            // Dwarf
            { id: 'anvilOfMountain', name: 'Anvil of the Mountain', description: '25 damage + 2s stun (anvil drop)' },
            { id: 'hammerOfMountain', name: 'Hammer of the Mountain', description: '14 damage + 1.2s stun (collision)' },
            { id: 'unbreakableBastion', name: 'Unbreakable Bastion', description: '5 damage + 1.3s taunt + 250 shield (wave)' },

            // Elf
            { id: 'rainOfStars', name: 'Rain of Stars', description: '3 zones, 12 damage each (1.2s delay)' },
            { id: 'spiritOfForest', name: 'Spirit of the Forest', description: '1.8x speed + 3 HP/s regen for 4s' },

            // Orc
            { id: 'wrathOfWarlord', name: 'Wrath of the Warlord', description: '15 damage + 1.3s fear (shockwave)' },
            { id: 'unstoppableStrength', name: 'Unstoppable Strength', description: '+30% damage, +50% speed, CC immune 3s' },

            // Human
            { id: 'lastStand', name: 'Last Stand', description: '+20% damage + shield until broken' },
            { id: 'herosWrath', name: 'Heros Wrath', description: '7 damage x3 hits (collision-based)' },

            // Demon
            { id: 'demonicAscension', name: 'Demonic Ascension', description: '+30% damage + 30% lifesteal for 4s' },
            { id: 'apocalypseFlame', name: 'Apocalypse Flame', description: '10 damage/s for 5s (random area)' }
        ];
    }

    handleUltimateSelection(playerNum) {
        const selected = document.querySelector('.selection-option.selected');
        if (!selected) {
            alert('Please select an ultimate skill!');
            return;
        }

        const ultimateId = selected.dataset.ultimate;
        this[`selectedUltimate${playerNum}`] = ultimateId;

        if (playerNum === 1) {
            this.currentSelectionStep = 'ultimate2';
            this.showUltimateSelection(2);
        } else {
            this.currentSelectionStep = 'start';
            this.showStartGame();
        }
    }

    showStartGame() {
        const title = document.getElementById('selectionTitle');
        const content = document.getElementById('selectionContent');

        title.textContent = 'Ready to Battle!';
        content.innerHTML = `
            <div style="text-align: center;">
                <h3>${this.player1.name} vs ${this.player2.name}</h3>
                <p>Battle will begin in 3 seconds...</p>
                <button class="next-button" id="nextButton">Start Battle!</button>
            </div>
        `;

        // Re-setup event listener
        document.getElementById('nextButton').addEventListener('click', () => this.nextSelectionStep());
    }

    startRandomMatch() {
        const name1Input = document.getElementById('player1Input');
        const name2Input = document.getElementById('player2Input');

        const name1 = name1Input ? (name1Input.value.trim() || 'Player 1') : (this.player1 ? this.player1.name : 'Player 1');
        const name2 = name2Input ? (name2Input.value.trim() || 'Player 2') : (this.player2 ? this.player2.name : 'Player 2');

        this.player1 = { name: name1 };
        this.player2 = { name: name2 };

        const races = ['human', 'demon', 'orc', 'elf', 'dwarf', 'barbarian'];
        const weapons = ['bow', 'dualSword', 'sword', 'staff', 'crossbow', 'unarmed'];
        const activeSkills = this.getAllActiveSkills();
        const ultimateSkills = this.getAllUltimateSkills();

        // Randomize Player 1
        this.selectedRace1 = races[Math.floor(Math.random() * races.length)];
        const p1Passives = this.getPassiveSkillsForRace(this.selectedRace1);
        this.selectedPassive1 = p1Passives[Math.floor(Math.random() * p1Passives.length)].id;
        this.selectedWeapon1 = weapons[Math.floor(Math.random() * weapons.length)];
        const p1Attacks = this.getAttacksForWeapon(this.selectedWeapon1);
        this.selectedAttack1 = p1Attacks[Math.floor(Math.random() * p1Attacks.length)].id;
        this.selectedSkill1 = activeSkills[Math.floor(Math.random() * activeSkills.length)].id;
        this.selectedUltimate1 = ultimateSkills[Math.floor(Math.random() * ultimateSkills.length)].id;

        // Randomize Player 2
        this.selectedRace2 = races[Math.floor(Math.random() * races.length)];
        const p2Passives = this.getPassiveSkillsForRace(this.selectedRace2);
        this.selectedPassive2 = p2Passives[Math.floor(Math.random() * p2Passives.length)].id;
        this.selectedWeapon2 = weapons[Math.floor(Math.random() * weapons.length)];
        const p2Attacks = this.getAttacksForWeapon(this.selectedWeapon2);
        this.selectedAttack2 = p2Attacks[Math.floor(Math.random() * p2Attacks.length)].id;
        this.selectedSkill2 = activeSkills[Math.floor(Math.random() * activeSkills.length)].id;
        this.selectedUltimate2 = ultimateSkills[Math.floor(Math.random() * ultimateSkills.length)].id;

        this.startGame();
    }

    startGame() {
        this.hideSelectionScreen();
        this.gameState = 'playing';

        // Create balls
        this.balls = [
            new Ball(1, this.player1.name, this.selectedRace1, this.selectedWeapon1, this.selectedAttack1, this.selectedSkill1, this.selectedUltimate1, 100, 150, this.selectedPassive1),
            new Ball(2, this.player2.name, this.selectedRace2, this.selectedWeapon2, this.selectedAttack2, this.selectedSkill2, this.selectedUltimate2, 300, 150, this.selectedPassive2)
        ];

        // Handle Jack of All Trades - copy opponent's passive skill
        const ball1 = this.balls[0];
        const ball2 = this.balls[1];

        // Check if ball1 has Jack of All Trades
        if (ball1.passiveSkills.includes('jackOfAllTrades') && ball2.selectedPassive && ball2.selectedPassive !== 'jackOfAllTrades') {
            ball1.copiedPassive = ball2.selectedPassive;
            // Add the copied passive to passiveSkills array so it gets applied
            if (!ball1.passiveSkills.includes(ball2.selectedPassive)) {
                ball1.passiveSkills.push(ball2.selectedPassive);
            }
        }

        // Check if ball2 has Jack of All Trades
        if (ball2.passiveSkills.includes('jackOfAllTrades') && ball1.selectedPassive && ball1.selectedPassive !== 'jackOfAllTrades') {
            ball2.copiedPassive = ball1.selectedPassive;
            // Add the copied passive to passiveSkills array so it gets applied
            if (!ball2.passiveSkills.includes(ball1.selectedPassive)) {
                ball2.passiveSkills.push(ball1.selectedPassive);
            }
        }

        // Clear projectiles
        this.projectiles = [];

        // Set global game instance for projectile creation
        window.gameInstance = this;

        // Update UI
        document.getElementById('player1Name').textContent = this.player1.name;
        document.getElementById('player2Name').textContent = this.player2.name;

        // Initialize frame timing
        this.lastFrameTime = performance.now();

        // Start game loop
        this.gameLoop();
    }

    gameLoop() {
        if (this.gameState !== 'playing' && this.gameState !== 'victory') {
            requestAnimationFrame(() => this.gameLoop());
            return;
        }

        // Calculate delta time (time since last frame in seconds)
        const currentTime = performance.now();
        const deltaTime = Math.min((currentTime - this.lastFrameTime) / 1000, 0.1); // Cap at 0.1s to prevent large jumps
        this.lastFrameTime = currentTime;

        this.update(deltaTime);
        this.render();

        requestAnimationFrame(() => this.gameLoop());
    }

    update(deltaTime) {
        this.balls.forEach(ball => {
            ball.update(this.balls, this.canvas.width, this.canvas.height, deltaTime);
        });

        // Update projectiles
        this.projectiles = this.projectiles.filter(projectile => {
            return projectile.update(this.balls, this.canvas.width, this.canvas.height, deltaTime);
        });

        // Update visual effects
        this.visualEffects = this.visualEffects.filter(effect => {
            return effect.update(deltaTime);
        });

        this.updateUI();
    }

    updateUI() {
        // In victory state, just keep the winner ball moving - no UI updates needed
        if (this.gameState === 'victory') {
            return;
        }

        // Update HP bars
        const ball1 = this.balls[0];
        const ball2 = this.balls[1];

        if (!ball1 || !ball2) return; // Safety check

        const hp1Percent = (ball1.hp / ball1.maxHp) * 100;
        const hp2Percent = (ball2.hp / ball2.maxHp) * 100;

        const hp1Element = document.getElementById('player1HP');
        const hp2Element = document.getElementById('player2HP');

        if (hp1Element) hp1Element.style.width = hp1Percent + '%';
        if (hp2Element) hp2Element.style.width = hp2Percent + '%';

        // Update shield bars
        this.updateShieldDisplay(1, ball1);
        this.updateShieldDisplay(2, ball2);

        // Update cooldowns
        this.updateCooldownDisplay(1, ball1);
        this.updateCooldownDisplay(2, ball2);

        // Update stats display (pass both balls so we can check target HP for Execution Strike)
        this.updateStatsDisplay(1, ball1, ball2);
        this.updateStatsDisplay(2, ball2, ball1);

        // Check for game over
        if (ball1.hp <= 0 || ball2.hp <= 0) {
            this.gameState = 'gameOver';
            this.showGameOver();
        }
    }

    updateShieldDisplay(playerNum, ball) {
        const shieldBar = document.getElementById(`player${playerNum}Shield`);
        if (!shieldBar) return; // Exit if element doesn't exist yet

        if (ball.shield > 0) {
            const maxShield = Math.max(ball.maxHp * 0.3, ball.unbreakableBastionShieldMax || 0, ball.shield);
            const shieldPercent = (ball.shield / maxShield) * 100;
            shieldBar.style.width = shieldPercent + '%';
        } else {
            shieldBar.style.width = '0%';
        }
    }

    updateCooldownDisplay(playerNum, ball) {
        const skillDiv = document.getElementById(`player${playerNum}Skills`);
        if (!skillDiv) return; // Exit if element doesn't exist yet

        // Get skill images and names
        const basicAttackImage = this.getSkillImage(ball.weapon, ball.attack);
        const activeSkillImage = this.getSkillImage('skill', ball.skill);
        const ultimateImage = this.getSkillImage('ultimate', ball.ultimate);

        const basicAttackName = this.getSkillName(ball.attack);
        const activeSkillName = this.getSkillName(ball.skill);
        const ultimateName = this.getSkillName(ball.ultimate);
        let activeSkillStatus;
        if (ball.feared) {
            activeSkillStatus = 'Fear';
        } else if (ball.activeSkillCooldown > 0) {
            activeSkillStatus = ball.activeSkillCooldown.toFixed(1) + 's';
        } else if (ball.skill === 'fortify' && ball.fortifyActive) {
            activeSkillStatus = 'Active';
        } else if (ball.skill === 'runeCharge' && ball.runeChargeActive) {
            activeSkillStatus = 'Active';
        } else if (ball.skill === 'headbutt' && ball.headbuttActive) {
            activeSkillStatus = 'Active';
        } else if (ball.skill === 'bloodFrenzy' && ball.bloodFrenzyStacks > 0) {
            activeSkillStatus = 'Active';
        } else if (ball.skill === 'battleRoar' && ball.battleRoarBonusStacks > 0) {
            activeSkillStatus = 'Active';
        } else {
            activeSkillStatus = 'Ready';
        }

        const unstoppableUltimateSelected = ball.ultimate === 'unstoppableStrength';
        let ultimateStatus;
        if (ball.feared && !unstoppableUltimateSelected) {
            ultimateStatus = 'Fear';
        } else if (unstoppableUltimateSelected && ball.unstoppableStrengthActive) {
            ultimateStatus = 'Active';
        } else if (ball.ultimate === 'unbreakableBastion' && ball.unbreakableBastionActive) {
            ultimateStatus = 'Active';
        } else if (ball.ultimateCooldown > 0) {
            ultimateStatus = ball.ultimateCooldown.toFixed(1) + 's';
        } else {
            ultimateStatus = 'Ready';
        }

        skillDiv.innerHTML = `
            <div class="skill-item">
                <div class="skill-name">${basicAttackName}:</div>
                <img src="${basicAttackImage}" class="skill-image" alt="Basic Attack">
                <div class="skill-cooldown">${ball.basicAttackCooldown > 0 ? ball.basicAttackCooldown.toFixed(1) + 's' : 'Ready'}</div>
            </div>
            <div class="skill-item">
                <div class="skill-name">${activeSkillName}:</div>
                <img src="${activeSkillImage}" class="skill-image" alt="Active Skill">
                <div class="skill-cooldown">${activeSkillStatus}</div>
            </div>
            <div class="skill-item">
                <div class="skill-name">${ultimateName}:</div>
                <img src="${ultimateImage}" class="skill-image" alt="Ultimate">
                <div class="skill-cooldown">${ultimateStatus}</div>
            </div>
        `;
    }

    updateStatsDisplay(playerNum, ball, target = null) {
        // Update HP
        const hpStatElement = document.getElementById(`player${playerNum}HPStat`);
        if (hpStatElement) {
            hpStatElement.textContent = `${Math.round(ball.hp)} / ${ball.maxHp}`;
        }

        // Update Shield
        const shieldStatElement = document.getElementById(`player${playerNum}ShieldStat`);
        if (shieldStatElement) {
            shieldStatElement.textContent = Math.round(ball.shield || 0);
        }

        // Update Basic Attack Damage
        const attackNameElement = document.getElementById(`player${playerNum}AttackName`);
        const attackDamageElement = document.getElementById(`player${playerNum}AttackDamage`);
        if (attackNameElement && attackDamageElement) {
            const attackName = this.getSkillName(ball.attack) || 'Basic Attack';
            attackNameElement.textContent = `${attackName} Damage:`;
            const attackDamage = ball.getBasicAttackDamagePreview(target);
            attackDamageElement.textContent = attackDamage;
        }

        // Update Active Skill Damage
        const skillNameElement = document.getElementById(`player${playerNum}SkillName`);
        const skillDamageElement = document.getElementById(`player${playerNum}SkillDamage`);
        if (skillNameElement && skillDamageElement) {
            const skillName = this.getSkillName(ball.skill) || 'Basic Skill';
            const skillValue = ball.getActiveSkillDamagePreview();

            // Stack-based skills and utility skills - show "Skill Name:" without "Damage"
            const nonDamageSkills = [
                'fortify', 'runeCharge', 'battleRoar', 'bloodFrenzy',
                'battleFocus', 'executionStrike', 'shadowstep',
                'battleCry', 'tacticalRoll', 'naturesGrasp'
            ];

            if (nonDamageSkills.includes(ball.skill)) {
                skillNameElement.textContent = `${skillName}:`;
            } else {
                skillNameElement.textContent = `${skillName} Damage:`;
            }

            skillDamageElement.textContent = skillValue;
        }

        // Update Ultimate Skill
        const ultimateNameElement = document.getElementById(`player${playerNum}UltimateName`);
        const ultimateDamageElement = document.getElementById(`player${playerNum}UltimateDamage`);
        if (ultimateNameElement && ultimateDamageElement) {
            const ultimateName = this.getSkillName(ball.ultimate) || 'Ultimate';
            const ultimateValue = ball.getUltimateDamagePreview();

            // Buff/utility ultimates - show without "Damage"
            const nonDamageUltimates = [
                'unstoppableRage', 'spiritOfForest', 'unstoppableStrength',
                'lastStand', 'demonicAscension', 'unbreakableBastion',
                'hammerOfMountain', 'herosWrath'
            ];

            if (nonDamageUltimates.includes(ball.ultimate)) {
                ultimateNameElement.textContent = `${ultimateName}:`;
            } else {
                ultimateNameElement.textContent = `${ultimateName} Damage:`;
            }

            ultimateDamageElement.textContent = ultimateValue;
        }

        // Update Crit Chance
        const critChanceElement = document.getElementById(`player${playerNum}CritChance`);
        if (critChanceElement) {
            const critChance = ball.getCritChance();
            critChanceElement.textContent = `${Math.round(critChance * 100)}%`;
        }

        // Update Defence
        const defenceElement = document.getElementById(`player${playerNum}Defence`);
        if (defenceElement) {
            let totalDefence = ball.getTotalDefence();
            // Add visual indicator if Spirit Bond buff is active
            if (ball.spiritBondBuffTimer > 0) {
                totalDefence = `${totalDefence} (+1)`;
                defenceElement.style.color = '#4CAF50'; // Green
            } else {
                defenceElement.style.color = '#fff';
            }
            defenceElement.textContent = totalDefence;
        }

        // Update Passive Skill
        const passiveNameElement = document.getElementById(`player${playerNum}PassiveName`);
        const passiveDescElement = document.getElementById(`player${playerNum}PassiveDesc`);
        if (passiveNameElement && passiveDescElement && ball.passiveSkills && ball.passiveSkills.length > 0) {
            const passiveId = ball.passiveSkills[0];
            const racePassives = this.getPassiveSkillsForRace(ball.race);
            const passiveSkill = racePassives.find(s => s.id === passiveId);

            if (passiveSkill) {
                passiveNameElement.textContent = passiveSkill.name;
                passiveDescElement.textContent = passiveSkill.description;
            } else {
                passiveNameElement.textContent = 'None';
                passiveDescElement.textContent = 'No passive skill active.';
            }
        }
    }

    getSkillImage(type, skillName) {
        const imageMap = {
            // Basic attacks
            'sword': 'basic attack/sword.png',
            'dualSword': 'basic attack/dual sword.png',
            'bow': 'basic attack/bow.png',
            'crossbow': 'basic attack/crossbow.png',
            'staff': 'basic attack/staff.png',
            'unarmed': 'basic attack/unarmed.png',

            // Basic skills
            'axeThrow': 'Basic Skill/Axe Throw.png',
            'frenziedSlash': 'Basic Skill/Frenzied Slash.png',
            'warStomp': 'Basic Skill/War Stomp_01.png',
            'warStompFrame1': 'Basic Skill/War Stomp_01.png',
            'warStompFrame2': 'Basic Skill/War Stomp_02.png',
            'warStompFrame3': 'Basic Skill/War Stomp_03.png',
            'warStompFrame4': 'Basic Skill/War Stomp_04.png',
            'warStompFrame5': 'Basic Skill/War Stomp_05.png',
            'battleFocus': 'Basic Skill/Battle Focus.png',
            'executionStrike': 'Basic Skill/Execution Strike.png',
            'shieldBash': 'Basic Skill/Shield Bash.png',
            'hammerStrike': 'Basic Skill/hammer_strike1.png',
            'hammerStrikeFrame1': 'Basic Skill/hammer_strike1.png',
            'hammerStrikeFrame2': 'Basic Skill/hammer_strike2.png',
            'hammerStrikeFrame3': 'Basic Skill/hammer_strike3.png',
            'hammerStrikeFrame4': 'Basic Skill/hammer_strike4.png',
            'hammerStrikeFrame5': 'Basic Skill/hammer_strike5.png',
            'hammerStrikeFrame6': 'Basic Skill/hammer_strike6.png',
            'hammerStrikeFrame7': 'Basic Skill/hammer_strike7.png',
            'hammerStrikeFrame8': 'Basic Skill/hammer_strike8.png',
            'stoneTossFrame1': 'Basic Skill/stonetoss1.png',
            'stoneTossFrame2': 'Basic Skill/stonetoss2.png',
            'stoneTossFrame3': 'Basic Skill/stonetoss3.png',
            'stoneTossFrame4': 'Basic Skill/stonetoss4.png',
            'stoneTossFrame5': 'Basic Skill/stonetoss5.png',
            'stoneTossFrame6': 'Basic Skill/stonetoss6.png',
            'stoneTossFrame7': 'Basic Skill/stonetoss7.png',
            'stoneTossFrame8': 'Basic Skill/stonetoss8.png',
            'stoneToss': 'Basic Skill/Stone Toss.png',
            'fortify': 'Basic Skill/Fortify.png',
            'runeCharge': 'Basic Skill/Rune Charge.png',
            'arrowStorm': 'Basic Skill/arrow_storm_frame_3.png',
            'naturesGrasp': 'Basic Skill/natures_grasp_frame_3.png',
            'shadowstep': 'Basic Skill/shadowstep_frame_4.png',
            'sylvanMark': 'Basic Skill/sylvan_mark_frame_4.png',
            'throwingAxe': 'Basic Skill/Throwing Axe.png',
            'battleRoar': 'Basic Skill/battle_roar_4.png',
            'headbutt': 'Basic Skill/Headbutt.png',
            'bloodFrenzy': 'Basic Skill/Blood Frenzy.png',
            'hellfireBolt': 'Basic Skill/Hellfire Bolt.png',
            'soulLeech': 'Basic Skill/soul_leech_frame_01.png',
            'dreadAura': 'Basic Skill/Dread_aura_1.png',
            'infernalChains': 'Basic Skill/chain_root_flicker_frame_01.png',
            'battleCry': 'Basic Skill/Battle Cry.png',

            // Ultimate skills
            'unstoppableRage': 'Ultimate Skill/unstoppable_rage_1.png',
            'earthshatter': 'Ultimate Skill/earthshatter_frame_07.png',
            'anvilOfMountain': 'Ultimate Skill/anvil of the mountain.png',
            'hammerOfMountain': 'Ultimate Skill/hammer_of_the_mountain1.png',
            'unbreakableBastion': 'Ultimate Skill/Unbreakable Bastion.png',
            'rainOfStars': 'Ultimate Skill/rain_of_stars_frame_4.png',
            'spiritOfForest': 'Ultimate Skill/spirit_of_the_forest.png',
            'wrathOfWarlord': 'Ultimate Skill/Wrath of Warlord.png',
            'unstoppableStrength': 'Ultimate Skill/unstoppable_rage_1.png',
            'lastStand': 'Ultimate Skill/Last Stand.png',
            'herosWrath': 'Ultimate Skill/Heros Wrath.png',
            'demonicAscension': 'Ultimate Skill/Demonic Ascension.png',
            'demonicAscensionActive': 'Ultimate Skill/Demonic Ascension.png',
            'apocalypseFlame': 'Ultimate Skill/Apocalypse Flame.png'
        };

        return imageMap[skillName] || 'basic attack/unarmed.png'; // Default fallback
    }

    getSkillName(skillName) {
        const nameMap = {
            // Basic attacks
            'heavySlash': 'Heavy Slash',
            'quickJab': 'Quick Jab',
            'shieldBreaker': 'Shield Breaker',
            'whirlwindSlash': 'Whirlwind Slash',
            'twinStrikes': 'Twin Strikes',
            'bleedingCuts': 'Bleeding Cuts',
            'preciseShot': 'Precise Shot',
            'volley': 'Volley',
            'piercingArrow': 'Piercing Arrow',
            'arcaneBolt': 'Arcane Bolt',
            'elementalBurst': 'Elemental Burst',
            'focusedBeam': 'Focused Beam',
            'sniperBolt': 'Sniper Bolt',
            'scatterShot': 'Scatter Shot',
            'explosiveBolt': 'Explosive Bolt',
            'ironFist': 'Iron Fist',
            'flurryOfBlows': 'Flurry of Blows',
            'grappleSlam': 'Grapple Slam',

            // Basic skills
            'axeThrow': 'Axe Throw',
            'frenziedSlash': 'Frenzied Slash',
            'warStomp': 'War Stomp',
            'battleCry': 'Battle Cry',
            'hammerStrike': 'Hammer Strike',
            'stoneToss': 'Stone Toss',
            'fortify': 'Fortify',
            'runeCharge': 'Rune Charge',
            'arrowStorm': 'Arrow Storm',
            'naturesGrasp': 'Nature\'s Grasp',
            'shadowstep': 'Shadowstep',
            'sylvanMark': 'Sylvan Mark',
            'throwingAxe': 'Throwing Axe',
            'battleRoar': 'Battle Roar',
            'headbutt': 'Headbutt',
            'bloodFrenzy': 'Blood Frenzy',
            'shieldBash': 'Shield Bash',
            'tacticalRoll': 'Tactical Roll',
            'battleFocus': 'Battle Focus',
            'executionStrike': 'Execution Strike',
            'hellfireBolt': 'Hellfire Bolt',
            'soulLeech': 'Soul Leech',
            'dreadAura': 'Dread Aura',
            'infernalChains': 'Infernal Chains',

            // Ultimate skills
            'unstoppableRage': 'Unstoppable Rage',
            'earthshatter': 'Earthshatter',
            'anvilOfMountain': 'Anvil of the Mountain',
            'hammerOfMountain': 'Hammer of the Mountain',
            'unbreakableBastion': 'Unbreakable Bastion',
            'rainOfStars': 'Rain of Stars',
            'spiritOfForest': 'Spirit of the Forest',
            'wrathOfWarlord': 'Wrath of the Warlord',
            'unstoppableStrength': 'Unstoppable Strength',
            'lastStand': 'Last Stand',
            'herosWrath': 'Hero\'s Wrath',
            'demonicAscension': 'Demonic Ascension',
            'apocalypseFlame': 'Apocalypse Flame'
        };

        return nameMap[skillName] || skillName; // Return original name if not found
    }

    showGameOver() {
        const winner = this.balls[0].hp > 0 ? this.balls[0] : this.balls[1];
        const loser = this.balls[0].hp <= 0 ? this.balls[0] : this.balls[1];

        // Remove the loser's weapon effect
        if (loser.weaponEffect) {
            loser.weaponEffect.duration = 0;
            loser.weaponEffect = null;
        }

        // Remove any visual effects that follow the loser
        this.visualEffects = this.visualEffects.filter(effect => effect.followTarget !== loser);

        // Remove the loser ball from the array
        this.balls = this.balls.filter(ball => ball !== loser);

        // Restore winner's HP to full
        winner.hp = winner.maxHp;

        // Set game state to victory (keeps the game loop running)
        this.gameState = 'victory';
    }

    createVisualEffect(x, y, type, duration = 1, data = {}) {
        const effect = new VisualEffect(x, y, type, duration, data);
        this.visualEffects.push(effect);
        if (data.imageKey) {
            console.log(`Creating visual effect with image: ${data.imageKey}`);
        }

        // Special debug for anvil drop
        if (type === 'anvilDrop') {
            console.log(`ANVIL DROP: Created at (${x}, ${y}) with type ${type}`);
        }

        return effect;
    }


    render() {
        // Clear canvas with white background
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw projectiles first (behind balls)
        this.projectiles.forEach(projectile => {
            projectile.render(this.ctx);
        });

        // Draw behind-ball effects first
        this.visualEffects.forEach(effect => {
            if (effect.data && effect.data.behindBall) {
                effect.render(this.ctx);
            }
        });

        // Draw balls
        this.balls.forEach(ball => {
            ball.render(this.ctx);
        });

        // Draw visual effects on top of balls (skip behind-ball effects)
        this.visualEffects.forEach(effect => {
            if (!effect.data || !effect.data.behindBall) {
                effect.render(this.ctx);
            }
        });

        // Draw CC dodge messages
        if (this.ccDodgeMessages) {
            this.ccDodgeMessages.forEach(message => {
                if (message.followTarget) {
                    // Update position to follow target
                    message.x = message.followTarget.x;
                    message.y = message.followTarget.y + message.offsetY;
                }

                // Calculate fade based on duration
                const elapsed = (Date.now() - message.startTime) / 1000;
                const progress = elapsed / message.duration;
                const alpha = Math.max(0, 1 - progress);

                if (alpha > 0) {
                    this.ctx.save();
                    this.ctx.globalAlpha = alpha;
                    this.ctx.fillStyle = message.color;
                    this.ctx.font = `bold ${message.fontSize}px Arial`;
                    this.ctx.textAlign = 'center';
                    this.ctx.textBaseline = 'middle';

                    // Add text shadow for visibility
                    this.ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
                    this.ctx.shadowBlur = 4;
                    this.ctx.shadowOffsetX = 2;
                    this.ctx.shadowOffsetY = 2;

                    this.ctx.fillText(message.text, message.x, message.y);
                    this.ctx.restore();
                }
            });
        }

        // Draw cancelled move messages
        if (this.cancelledMessages) {
            this.cancelledMessages.forEach(message => {
                if (message.followTarget) {
                    // Update position to follow target
                    message.x = message.followTarget.x;
                    message.y = message.followTarget.y + message.offsetY;
                }

                // Calculate fade based on duration
                const elapsed = (Date.now() - message.startTime) / 1000;
                const progress = elapsed / message.duration;
                const alpha = Math.max(0, 1 - progress);

                if (alpha > 0) {
                    this.ctx.save();
                    this.ctx.globalAlpha = alpha;
                    this.ctx.fillStyle = message.color;
                    this.ctx.font = `bold ${message.fontSize}px Arial`;
                    this.ctx.textAlign = 'center';
                    this.ctx.textBaseline = 'middle';

                    // Add text shadow for visibility
                    this.ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
                    this.ctx.shadowBlur = 4;
                    this.ctx.shadowOffsetX = 2;
                    this.ctx.shadowOffsetY = 2;

                    this.ctx.fillText(message.text, message.x, message.y);
                    this.ctx.restore();
                }
            });
        }

        // Draw floating damage texts
        if (this.floatingDamageTexts) {
            const currentTime = Date.now();
            this.floatingDamageTexts = this.floatingDamageTexts.filter(dmgText => {
                const elapsed = (currentTime - dmgText.startTime) / 1000;
                const progress = elapsed / dmgText.duration;

                if (progress >= 1) return false; // Remove expired texts

                // Calculate position - follow target and move upward
                let x = dmgText.followTarget ? dmgText.followTarget.x : dmgText.x;
                let y = dmgText.followTarget ? dmgText.followTarget.y + dmgText.offsetY : dmgText.y;
                y -= elapsed * dmgText.moveSpeed; // Move upward over time

                // Calculate alpha for fade out
                const alpha = Math.max(0, 1 - progress);

                // Draw the damage text with stored random color
                this.ctx.save();
                this.ctx.globalAlpha = alpha;
                this.ctx.fillStyle = dmgText.color || '#ffff00'; // Use stored random color
                this.ctx.font = 'bold 28px Arial';
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';

                // Add text shadow for visibility
                this.ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
                this.ctx.shadowBlur = 3;
                this.ctx.shadowOffsetX = 1;
                this.ctx.shadowOffsetY = 1;

                this.ctx.fillText(dmgText.text, x, y);
                this.ctx.restore();

                return true; // Keep this text
            });
        }

        // Draw floating critical texts
        if (this.floatingCriticalTexts) {
            const currentTime = Date.now();
            this.floatingCriticalTexts = this.floatingCriticalTexts.filter(critText => {
                const elapsed = (currentTime - critText.startTime) / 1000;
                const progress = elapsed / critText.duration;

                if (progress >= 1) return false; // Remove expired texts

                // Calculate position - follow target and move upward
                let x = critText.followTarget ? critText.followTarget.x : critText.x;
                let y = critText.followTarget ? critText.followTarget.y + critText.offsetY : critText.y;
                y -= elapsed * critText.moveSpeed; // Move upward over time

                // Calculate alpha for fade out
                const alpha = Math.max(0, 1 - progress);

                // Draw the critical text in red
                this.ctx.save();
                this.ctx.globalAlpha = alpha;
                this.ctx.fillStyle = '#ff0000'; // Red color
                this.ctx.font = 'bold 32px Arial'; // Slightly larger than damage text
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';

                // Add text shadow for visibility
                this.ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
                this.ctx.shadowBlur = 4;
                this.ctx.shadowOffsetX = 2;
                this.ctx.shadowOffsetY = 2;

                this.ctx.fillText(critText.text, x, y);
                this.ctx.restore();

                return true; // Keep this text
            });
        }

        // Draw floating dodge texts
        if (this.floatingDodgeTexts) {
            const currentTime = Date.now();
            this.floatingDodgeTexts = this.floatingDodgeTexts.filter(dodgeText => {
                const elapsed = (currentTime - dodgeText.startTime) / 1000;
                const progress = elapsed / dodgeText.duration;

                if (progress >= 1) return false; // Remove expired texts

                // Calculate position - follow target and move upward
                let x = dodgeText.followTarget ? dodgeText.followTarget.x : dodgeText.x;
                let y = dodgeText.followTarget ? dodgeText.followTarget.y + dodgeText.offsetY : dodgeText.y;
                y -= elapsed * dodgeText.moveSpeed; // Move upward over time

                // Calculate alpha for fade out
                const alpha = Math.max(0, 1 - progress);

                // Draw the dodge text in cyan/light blue
                this.ctx.save();
                this.ctx.globalAlpha = alpha;
                this.ctx.fillStyle = '#00ffff'; // Cyan color
                this.ctx.font = 'bold 32px Arial'; // Same size as critical text
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';

                // Add text shadow for visibility
                this.ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
                this.ctx.shadowBlur = 4;
                this.ctx.shadowOffsetX = 2;
                this.ctx.shadowOffsetY = 2;

                this.ctx.fillText(dodgeText.text, x, y);
                this.ctx.restore();

                return true; // Keep this text
            });
        }
    }
}

// Visual Effect class for animations and effects
class VisualEffect {
    constructor(x, y, type, duration = 1, data = {}) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.duration = duration;
        this.maxDuration = duration;
        this.data = data;
        this.angle = data.angle || 0;
        this.size = data.size || 20;
        this.color = data.color || '#ff0000';
        this.targetX = data.targetX || x;
        this.targetY = data.targetY || y;
        this.imageKey = data.imageKey || null;
        this.followTarget = data.followTarget || null;
    }

    update(deltaTime = 0.016) {
        this.duration -= deltaTime;


        // If this effect should follow a target, update position
        if (this.followTarget) {
            this.x = this.followTarget.x;
            this.y = this.followTarget.y;

            // Apply offset if specified
            if (this.data.offsetY) {
                this.y += this.data.offsetY;
            }
        }

        return this.duration > 0;
    }

    render(ctx) {
        const progress = 1 - (this.duration / this.maxDuration);
        const alpha = Math.min(1, this.duration / 0.5); // Fade out in last 0.5 seconds

        ctx.save();
        ctx.globalAlpha = alpha;

        // Always handle hammer strike and stone toss explicitly so size/scaling are consistent
        if (this.type === 'hammerStrike') {
            this.renderHammerStrike(ctx, progress);
            ctx.restore();
            return;
        } else if (this.type === 'stoneToss') {
            this.renderStoneToss(ctx, progress);
            ctx.restore();
            return;
        } else if (this.type === 'wrathOfWarlord') {
            this.renderWrathOfWarlord(ctx, progress);
            ctx.restore();
            return;
        } else if (this.type === 'wrathOfWarlordWave') {
            this.renderWrathOfWarlordWave(ctx, progress);
            ctx.restore();
            return;
        } else if (this.type === 'hammerOfMountain') {
            this.renderHammerOfMountain(ctx, progress);
            ctx.restore();
            return;
        } else if (this.type === 'battleRoarWave') {
            this.renderBattleRoarWave(ctx, progress);
            ctx.restore();
            return;
        } else if (this.type === 'unbreakableBastion') {
            this.renderUnbreakableBastion(ctx, progress);
            ctx.restore();
            return;
        } else if (this.type === 'unbreakableBastionWave') {
            this.renderUnbreakableBastionWave(ctx, progress);
            ctx.restore();
            return;
        } else if (this.type === 'elementalBurstWave') {
            this.renderElementalBurstWave(ctx, progress);
            ctx.restore();
            return;
        }

        // Check if this effect has an image
        if (this.imageKey && window.gameInstance && window.gameInstance.images[this.imageKey]) {
            // Special handling for anvilDrop, arrowStorm, and naturesGrasp - don't use renderImage
            if (this.type === 'anvilDrop') {
                this.renderAnvilDrop(ctx, progress);
            } else if (this.type === 'arrowStorm') {
                this.renderArrowStorm(ctx, progress);
            } else if (this.type === 'naturesGrasp') {
                this.renderNatureGrasp(ctx, progress);
            } else if (this.type === 'rainOfStars') {
                this.renderRainOfStars(ctx, progress);
            } else if (this.type === 'rainOfStarsZone') {
                this.renderRainOfStarsZone(ctx, progress);
            } else if (this.type === 'rainOfStarsIndicator') {
                this.renderRainOfStarsIndicator(ctx, progress);
            } else if (this.type === 'spiritOfForest') {
                this.renderSpiritOfForest(ctx, progress);
            } else if (this.type === 'regeneration') {
                this.renderRegeneration(ctx, progress);
            } else if (this.type === 'focusedBeam') {
                this.renderFocusedBeam(ctx, progress);
            } else if (this.type === 'infernalChains') {
                this.renderInfernalChains(ctx, progress);
            } else if (this.type === 'soulLeech') {
                this.renderSoulLeech(ctx, progress);
            } else if (this.type === 'apocalypseFlame') {
                this.renderApocalypseFlame(ctx, progress);
            } else if (this.type === 'demonicAscensionActive') {
                this.renderDemonicAscension(ctx, progress);
            } else if (this.type === 'dreadAura') {
                this.renderDreadAura(ctx, progress);
            } else if (this.type === 'warStomp') {
                this.renderWarStomp(ctx, progress);
            } else if (this.type === 'unstoppableRage') {
                this.renderUnstoppableRage(ctx, progress);
            } else if (this.type === 'earthshatter') {
                this.renderEarthshatter(ctx, progress);
            } else if (this.type === 'twinStrikes') {
                this.renderTwinStrikes(ctx, progress);
            } else if (this.type === 'whirlwindSlash') {
                this.renderWhirlwindSlash(ctx, progress);
            } else {
                this.renderImage(ctx, progress);
            }
        } else {
            // Fallback to original rendering
            switch (this.type) {
                case 'slash':
                    this.renderSlash(ctx, progress);
                    break;
                case 'explosion':
                    this.renderExplosion(ctx, progress);
                    break;
                case 'explosiveBoltCircle':
                    this.renderExplosiveBoltCircle(ctx, progress);
                    break;
                case 'heal':
                    this.renderHeal(ctx, progress);
                    break;
                case 'stun':
                    this.renderStun(ctx, progress);
                    break;
                case 'shield':
                    this.renderShield(ctx, progress);
                    break;
                case 'aura':
                    this.renderAura(ctx, progress);
                    break;
                case 'beam':
                    this.renderBeam(ctx, progress);
                    break;
                case 'sparkle':
                    this.renderSparkle(ctx, progress);
                    break;
                case 'smoke':
                    this.renderSmoke(ctx, progress);
                    break;
                case 'lightning':
                    this.renderLightning(ctx, progress);
                    break;
                case 'fire':
                    this.renderFire(ctx, progress);
                    break;
                case 'ice':
                    this.renderIce(ctx, progress);
                    break;
                case 'earth':
                    this.renderEarth(ctx, progress);
                    break;
                case 'blood':
                    this.renderBlood(ctx, progress);
                    break;
                case 'weapon':
                    this.renderWeapon(ctx, progress);
                    break;
                case 'trail':
                    this.renderTrail(ctx, progress);
                    break;
                case 'anvilDrop':
                    this.renderAnvilDrop(ctx, progress);
                    break;
                case 'wind':
                    this.renderWind(ctx, progress);
                    break;
                case 'dark':
                    this.renderDark(ctx, progress);
                    break;
                case 'light':
                    this.renderLight(ctx, progress);
                    break;
                case 'shadowstep':
                    this.renderShadowstep(ctx, progress);
                    break;
                case 'sylvanMark':
                    this.renderSylvanMark(ctx, progress);
                    break;
                case 'rainOfStars':
                    this.renderRainOfStars(ctx, progress);
                    break;
                case 'rainOfStarsZone':
                    this.renderRainOfStarsZone(ctx, progress);
                    break;
                case 'rainOfStarsIndicator':
                    this.renderRainOfStarsIndicator(ctx, progress);
                    break;
                case 'spiritOfForest':
                    this.renderSpiritOfForest(ctx, progress);
                    break;
                case 'regeneration':
                    this.renderRegeneration(ctx, progress);
                    break;
                case 'focusedBeam':
                    this.renderFocusedBeam(ctx, progress);
                    break;
                case 'infernalChains':
                    this.renderInfernalChains(ctx, progress);
                    break;
                case 'soulLeech':
                    this.renderSoulLeech(ctx, progress);
                    break;
                case 'apocalypseFlame':
                    this.renderApocalypseFlame(ctx, progress);
                    break;
                case 'demonicAscensionActive':
                    this.renderDemonicAscension(ctx, progress);
                    break;
                case 'dreadAura':
                    this.renderDreadAura(ctx, progress);
                    break;
                case 'dreadAuraWave':
                    this.renderDreadAuraWave(ctx, progress);
                    break;
                case 'warStomp':
                    this.renderWarStomp(ctx, progress);
                    break;
                case 'unstoppableRage':
                    this.renderUnstoppableRage(ctx, progress);
                    break;
                case 'earthshatter':
                    this.renderEarthshatter(ctx, progress);
                    break;
                case 'twinStrikes':
                    this.renderTwinStrikes(ctx, progress);
                    break;
                case 'whirlwindSlash':
                    this.renderWhirlwindSlash(ctx, progress);
                    break;
                case 'elementalBurstWave':
                    this.renderElementalBurstWave(ctx, progress);
                    break;
            }
        }

        ctx.restore();
    }

    renderImage(ctx, progress) {
        // Handle Arrow Storm animation
        if (this.type === 'arrowStorm') {
            this.renderArrowStorm(ctx, progress);
            return;
        }

        const img = window.gameInstance.images[this.imageKey];
        if (!img) {
            console.log(`Image not found: ${this.imageKey}`);
            return;
        }
        if (!img.complete) {
            console.log(`Image not loaded yet: ${this.imageKey}`);
            return;
        }

        // Make skill images 1/4 the size
        let width = this.size * 2;
        let height = this.size * 2;

        // Reduce size for skill images (not basic attacks)
        if (this.imageKey === 'axeThrow' || this.imageKey === 'warStomp' ||
            this.imageKey === 'anvilOfMountain' || this.imageKey === 'earthshatter' ||
            this.imageKey === 'battleFocus' || this.imageKey === 'shieldBash') {
            width = this.size * 0.5; // 1/4 of original size
            height = this.size * 0.5;
        }

        // Last Stand should match the size we set in createLastStandEffect (half ball size)
        if (this.imageKey === 'lastStand') {
            width = this.size * 2; // Keep the size we set in createLastStandEffect
            height = this.size * 2;
        }

        // Battle Cry should match the ball size (don't scale it down)
        if (this.imageKey === 'battleCry') {
            width = this.size * 2; // Same size as the ball
            height = this.size * 2;
        }

        // Unstoppable Rage should match the ball size (don't scale it down)
        if (this.imageKey === 'unstoppableRage') {
            width = this.size * 2; // Same size as the ball
            height = this.size * 2;
        }

        // Earthshatter should match the ball size (don't scale it down)
        if (this.imageKey === 'earthshatter') {
            width = this.size * 2; // Same size as the ball
            height = this.size * 2;
        }

        // Attack effects should match the ball size (don't scale them down)
        if (this.imageKey === 'heavySlash' || this.imageKey === 'quickJab' || this.imageKey === 'shieldBreaker') {
            width = this.size * 2; // Same size as the ball
            height = this.size * 2;
        }

        // Execution Strike should match ball size (don't scale it down)
        if (this.imageKey === 'executionStrike') {
            width = this.size * 2; // Keep the size we set in createExecutionStrikeEffect
            height = this.size * 2;
        }

        // For weapons, position them around the ball
        let x, y;
        if (this.type === 'weapon' && this.followTarget) {
            // Position weapon around the ball
            const offsetDistance = 30; // Distance from ball center
            x = this.x + Math.cos(this.angle) * offsetDistance - width / 2;
            y = this.y + Math.sin(this.angle) * offsetDistance - height / 2;
        } else {
            // Normal positioning for other effects
            x = this.x - width / 2;
            y = this.y - height / 2;
        }

        // Apply rotation if specified
        if (this.angle !== undefined) {
            ctx.save();
            if (this.type === 'weapon' && this.followTarget) {
                // Special handling for bow, staff, sword, and dual sword - position around ball and rotate to face enemy
                if (this.imageKey === 'bow' || this.imageKey === 'staff' || this.imageKey === 'sword' || this.imageKey === 'dualSword' || this.imageKey === 'crossbow') {
                    if (this.data && this.data.weaponType === 'dualSword') {
                        // For dual sword, draw two swords on the sides of the ball (like hands)
                        const offsetDistance = 25; // Closer to the ball
                        const sideAngle1 = this.angle - Math.PI / 3; // 60 degrees to the left of enemy direction (more toward front)
                        const sideAngle2 = this.angle + Math.PI / 3; // 60 degrees to the right of enemy direction (more toward front)

                        const offsetX1 = this.x + Math.cos(sideAngle1) * offsetDistance;
                        const offsetY1 = this.y + Math.sin(sideAngle1) * offsetDistance;
                        const offsetX2 = this.x + Math.cos(sideAngle2) * offsetDistance;
                        const offsetY2 = this.y + Math.sin(sideAngle2) * offsetDistance;

                        // Draw first sword (left side)
                        ctx.translate(offsetX1, offsetY1);
                        ctx.rotate(this.angle + Math.PI / 4); // Point toward enemy with 45 degrees right tilt
                        ctx.drawImage(img, -width / 2, -height / 2, width, height);
                        ctx.restore();

                        // Draw second sword (right side)
                        ctx.save();
                        ctx.translate(offsetX2, offsetY2);
                        ctx.rotate(this.angle + Math.PI / 4); // Point toward enemy with 45 degrees right tilt
                        ctx.drawImage(img, -width / 2, -height / 2, width, height);
                    } else {
                        // For bow, staff, and sword, position them outside the ball and rotate to face enemy
                        const offsetDistance = 25; // Closer to the ball (same as dual sword)
                        let offsetX, offsetY;

                        if (this.data && this.data.weaponType === 'sword') {
                            // For single sword, position it at front-left angle (like dual sword positioning)
                            const sideAngle = this.angle - Math.PI / 3; // 60 degrees to the left of enemy direction
                            offsetX = this.x + Math.cos(sideAngle) * offsetDistance;
                            offsetY = this.y + Math.sin(sideAngle) * offsetDistance;
                        } else {
                            // For bow and staff, position directly in front
                            offsetX = this.x + Math.cos(this.angle) * offsetDistance;
                            offsetY = this.y + Math.sin(this.angle) * offsetDistance;
                        }

                        // Rotate the weapon image to face the enemy direction
                        ctx.translate(offsetX, offsetY);
                        if (this.data && this.data.weaponType === 'sword') {
                            ctx.rotate(this.angle + Math.PI / 4); // 45 degrees right tilt (same as dual sword)
                        } else if (this.imageKey === 'crossbow') {
                            ctx.rotate(this.angle + Math.PI / 4); // Corrected orientation: -45 deg for (1,1) plus 90 deg right tilt
                        } else {
                            ctx.rotate(this.angle); // Normal rotation for bow and staff
                        }
                        ctx.drawImage(img, -width / 2, -height / 2, width, height);
                    }
                } else {
                    // For other weapons, rotate around the ball center
                    ctx.translate(this.x, this.y);
                    ctx.rotate(this.angle);

                    // Special handling for unarmed attacks - position around ball and rotate image
                    if (this.imageKey === 'unarmed') {
                        // Position the image around the ball (orbit)
                        const offsetDistance = 30; // Distance from ball center
                        const offsetX = Math.cos(this.angle) * offsetDistance;
                        const offsetY = Math.sin(this.angle) * offsetDistance;

                        // Rotate the image to match its position
                        ctx.rotate(this.angle);
                        ctx.drawImage(img, offsetX - width / 2, offsetY - height / 2, width, height);
                    } else {
                        // Normal weapon rendering for other weapons
                        ctx.drawImage(img, Math.cos(this.angle) * 30 - width / 2, Math.sin(this.angle) * 30 - height / 2, width, height);
                    }
                }
            } else {
                // Normal rotation for other effects
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angle);
                ctx.drawImage(img, -width / 2, -height / 2, width, height);
            }
            ctx.restore();
        } else {
            ctx.drawImage(img, x, y, width, height);
        }
    }

    renderSlash(ctx, progress) {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 4;
        ctx.beginPath();
        const angle = this.angle + progress * Math.PI;
        const length = this.size * (1 + progress);
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + Math.cos(angle) * length, this.y + Math.sin(angle) * length);
        ctx.stroke();
    }

    renderExplosion(ctx, progress) {
        const radius = this.size * progress;
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, radius);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(0.7, this.color + '80');
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
        ctx.fill();
    }

    renderExplosiveBoltCircle(ctx, progress) {
        const radius = 50 * progress; // Expand to 50
        ctx.strokeStyle = '#ff8800'; // Orange
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
        ctx.stroke();
    }

    renderHeal(ctx, progress) {
        ctx.fillStyle = '#00ff00';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('+', this.x, this.y - progress * 30);
    }

    renderStun(ctx, progress) {
        ctx.strokeStyle = '#ffff00';
        ctx.lineWidth = 3;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size + progress * 10, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
    }

    renderShield(ctx, progress) {
        ctx.strokeStyle = '#0088ff';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.stroke();
    }

    renderAura(ctx, progress) {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size + progress * 20, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
    }

    renderBeam(ctx, progress) {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.targetX, this.targetY);
        ctx.stroke();
    }

    renderSparkle(ctx, progress) {
        ctx.fillStyle = this.color;
        for (let i = 0; i < 5; i++) {
            const angle = (i / 5) * Math.PI * 2 + progress * Math.PI * 2;
            const distance = this.size * progress;
            const x = this.x + Math.cos(angle) * distance;
            const y = this.y + Math.sin(angle) * distance;
            ctx.fillRect(x - 2, y - 2, 4, 4);
        }
    }

    renderSmoke(ctx, progress) {
        ctx.fillStyle = this.color + '60';
        for (let i = 0; i < 3; i++) {
            const x = this.x + (Math.random() - 0.5) * 20;
            const y = this.y - progress * 40 + (Math.random() - 0.5) * 10;
            const size = (1 - progress) * 10;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    renderLightning(ctx, progress) {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        for (let i = 0; i < 5; i++) {
            const x = this.x + (this.targetX - this.x) * (i / 5) + (Math.random() - 0.5) * 20;
            const y = this.y + (this.targetY - this.y) * (i / 5) + (Math.random() - 0.5) * 20;
            ctx.lineTo(x, y);
        }
        ctx.lineTo(this.targetX, this.targetY);
        ctx.stroke();
    }

    renderFire(ctx, progress) {
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        gradient.addColorStop(0, '#ff4400');
        gradient.addColorStop(0.5, '#ff8800');
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * progress, 0, Math.PI * 2);
        ctx.fill();
    }

    renderIce(ctx, progress) {
        ctx.fillStyle = '#88ccff';
        ctx.strokeStyle = '#0088ff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * progress, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }

    renderEarth(ctx, progress) {
        ctx.fillStyle = '#8B4513';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * progress, 0, Math.PI * 2);
        ctx.fill();
    }

    renderBlood(ctx, progress) {
        ctx.fillStyle = '#ff0000';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * progress, 0, Math.PI * 2);
        ctx.fill();
    }

    renderWeapon(ctx, progress) {
        // This will be handled by renderImage since weapon effects use imageKey
        this.renderImage(ctx, progress);
    }

    renderTrail(ctx, progress) {
        if (!this.followTarget) return;

        // Draw a trail behind the ball
        ctx.save();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.size * 0.5;
        ctx.globalAlpha = 0.6;

        // Draw trail line
        ctx.beginPath();
        ctx.moveTo(this.x - this.data.trailLength, this.y);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();

        ctx.restore();
    }

    renderAnvilDrop(ctx, progress) {
        // Debug logging
        if (progress < 0.1) { // Only log at the start
            console.log(`Rendering anvil drop at position: (${this.x}, ${this.y})`);
        }

        // Calculate drop position - starts high and drops down
        const startY = -100; // Start above the canvas
        const endY = this.y;
        const currentY = startY + (endY - startY) * progress;

        // Calculate size - starts 3x bigger and gets smaller as it drops
        const startSize = this.size * 3; // Start 3x as big
        const endSize = this.size;
        const currentSize = startSize - (startSize - endSize) * progress;

        // Draw shadow on the ground that gets darker as anvil approaches
        const shadowAlpha = 0.2 + (0.6 * progress); // Shadow gets darker as anvil approaches
        ctx.save();
        ctx.globalAlpha = shadowAlpha;
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.ellipse(this.x, this.y + 10, this.size * 0.8, this.size * 0.3, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Draw the anvil image with proper scaling
        const img = window.gameInstance.images[this.imageKey];
        if (img && img.complete) {
            // Use the calculated currentSize directly, don't let renderImage override it
            const width = currentSize;
            const height = currentSize;
            const x = this.x - width / 2;
            const y = currentY - height / 2;

            ctx.drawImage(img, x, y, width, height);
        } else {
            // Fallback if image not loaded
            ctx.fillStyle = '#666666';
            ctx.fillRect(this.x - currentSize / 2, currentY - currentSize / 2, currentSize, currentSize);
        }
    }

    renderWind(ctx, progress) {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        for (let i = 0; i < 3; i++) {
            const angle = progress * Math.PI * 2 + i * Math.PI * 2 / 3;
            const x = this.x + Math.cos(angle) * this.size;
            const y = this.y + Math.sin(angle) * this.size;
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.stroke();
        }
    }

    renderDark(ctx, progress) {
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        gradient.addColorStop(0, '#440044');
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * progress, 0, Math.PI * 2);
        ctx.fill();
    }

    renderLight(ctx, progress) {
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        gradient.addColorStop(0, '#ffff88');
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * progress, 0, Math.PI * 2);
        ctx.fill();
    }

    renderArrowStorm(ctx, progress) {
        // Calculate which frame to show (0-7 for frames 1-8)
        const frameIndex = Math.floor(progress * 8);
        const frameNumber = Math.min(frameIndex + 1, 8); // Frame numbers are 1-8

        // Get the appropriate frame image
        const frameKey = `arrowStormFrame${frameNumber}`;
        const img = window.gameInstance.images[frameKey];

        if (!img || !img.complete) {
            console.log(`Arrow Storm frame not loaded: ${frameKey}`);
            return;
        }

        // Size the effect to be much larger and more visible
        const width = this.size * 6; // Make it 3x larger than the ball
        const height = this.size * 6;

        // For the last frame (frame 8), center it exactly on the ball
        // For other frames, position normally
        let x, y;
        if (frameNumber === 8) {
            // Last frame: center exactly on the ball
            x = this.x - width / 2;
            y = this.y - height / 2;
        } else {
            // Other frames: position slightly above the ball for falling effect
            const offsetY = (1 - progress) * 20; // Start 20 pixels above, fall to center
            x = this.x - width / 2;
            y = this.y - height / 2 - offsetY;
        }

        ctx.drawImage(img, x, y, width, height);
    }

    renderNatureGrasp(ctx, progress) {
        // Calculate which frame to show (0-11 for frames 1-6 played twice)
        const frameIndex = Math.floor(progress * 12); // 6 frames * 2 cycles = 12 total
        const frameNumber = (frameIndex % 6) + 1; // Cycle through frames 1-6 twice

        // Get the appropriate frame image
        const frameKey = `naturesGraspFrame${frameNumber}`;
        const img = window.gameInstance.images[frameKey];

        if (!img || !img.complete) {
            console.log(`Nature's Grasp frame not loaded: ${frameKey}`);
            return;
        }

        // Size the effect to be 2x the ball size
        const width = this.size * 4; // 2x ball size (ball radius * 2 * 2)
        const height = this.size * 4;
        const x = this.x - width / 2;
        const y = this.y - height / 2;

        ctx.drawImage(img, x, y, width, height);
    }

    renderShadowstep(ctx, progress) {
        // Show all 8 frames as a trail from start to end
        for (let i = 0; i < 8; i++) {
            const frameNumber = i + 1; // Frame numbers are 1-8
            const frameKey = `shadowstepFrame${frameNumber}`;
            const img = window.gameInstance.images[frameKey];

            if (!img || !img.complete) {
                console.log(`Shadowstep frame not loaded: ${frameKey}`);
                continue;
            }

            // Calculate position along the trail
            // Frame 1 is at start, Frame 8 is at end
            const frameProgress = i / 7; // 0 to 1 for frames 1-8
            const currentX = this.data.startX + (this.data.endX - this.data.startX) * frameProgress;
            const currentY = this.data.startY + (this.data.endY - this.data.startY) * frameProgress;

            // Size the effect to be larger and more visible
            const width = this.size * 4; // Make it 2x larger than the ball
            const height = this.size * 4;
            const x = currentX - width / 2;
            const y = currentY - height / 2;

            ctx.drawImage(img, x, y, width, height);
        }
    }

    renderSylvanMark(ctx, progress) {
        // For the last 0.5 seconds (25% of duration), show frame 8
        let frameNumber;
        if (progress >= 0.75) {
            frameNumber = 8; // Last frame stays until arrow is created
        } else {
            const frameIndex = Math.floor(progress * 6); // Use first 6 frames for animation
            frameNumber = Math.min(frameIndex + 1, 6);
        }

        // Get the appropriate frame image
        const frameKey = `sylvanMarkFrame${frameNumber}`;
        const img = window.gameInstance.images[frameKey];

        if (!img || !img.complete) {
            console.log(`Sylvan Mark frame not loaded: ${frameKey}`);
            return;
        }

        // Get the target position (use followTarget if available for accurate centering)
        const targetX = this.followTarget ? this.followTarget.x : this.x;
        const targetY = this.followTarget ? this.followTarget.y : this.y;

        // Size the effect to be 2x the ball size
        const width = this.size * 4; // 2x the ball diameter
        const height = this.size * 4;

        // Offset to compensate for sprite's visual center being off-center
        const offsetX = 0; // No X offset
        const offsetY = -height * 0.12; // Shift up 8%

        const x = targetX - width / 2 + offsetX;
        const y = targetY - height / 2 + offsetY;

        ctx.drawImage(img, x, y, width, height);
    }

    renderRainOfStars(ctx, progress) {
        // Use 5 frames
        const totalFrames = 5;
        const frameIndex = Math.floor(progress * totalFrames);
        const frameNumber = Math.min(frameIndex + 1, totalFrames);
        const frameKey = `rainOfStarsFrame${frameNumber}`;
        const img = window.gameInstance.images[frameKey];

        if (!img || !img.complete) {
            console.log(`Rain of Stars frame not loaded: ${frameKey}`);
            return;
        }

        // Size the effect to be 2x the ball size
        const width = this.size * 4; // 2x the ball diameter
        const height = this.size * 4;
        const x = this.x - width / 2;
        const y = this.y - height / 2;

        ctx.drawImage(img, x, y, width, height);
    }

    renderRainOfStarsIndicator(ctx, progress) {
        // Draw a purple circle (empty inside) that pulses slightly
        const radius = this.size;
        const pulseAmount = Math.sin(progress * Math.PI * 4) * 5; // Pulse effect

        ctx.beginPath();
        ctx.arc(this.x, this.y, radius + pulseAmount, 0, Math.PI * 2);
        ctx.strokeStyle = this.data.color || '#8B008B';
        ctx.lineWidth = 3;
        ctx.globalAlpha = 0.8;
        ctx.stroke();
        ctx.globalAlpha = 1;
    }

    renderRainOfStarsZone(ctx, progress) {
        // Use 5 frames over 1.2 seconds
        const totalFrames = 5;
        const frameIndex = Math.floor(progress * totalFrames);
        const frameNumber = Math.min(frameIndex + 1, totalFrames);
        const frameKey = `rainOfStarsFrame${frameNumber}`;
        const img = window.gameInstance.images[frameKey];

        if (!img || !img.complete) {
            return;
        }

        // Size the effect (halved from original)
        const width = this.size * 1.5;
        const height = this.size * 1.5;
        const x = this.x - width / 2;
        const y = this.y - height / 2;

        // Fade out slightly toward the end
        const alpha = progress < 0.8 ? 1 : 1 - (progress - 0.8) / 0.2;
        ctx.globalAlpha = alpha;
        ctx.drawImage(img, x, y, width, height);
        ctx.globalAlpha = 1;

        // Check for enemy collisions and deal damage
        if (this.data && this.data.balls && this.data.caster && this.data.hitEnemies) {
            this.data.balls.forEach(ball => {
                if (ball.id !== this.data.caster.id && !this.data.hitEnemies.has(ball.id)) {
                    const distance = Math.sqrt((ball.x - this.x) ** 2 + (ball.y - this.y) ** 2);
                    if (distance < this.size + ball.radius) {
                        // Enemy is in the zone - deal damage once
                        this.data.hitEnemies.add(ball.id);
                        this.data.caster.dealDamage(ball, this.data.damage, { skillName: 'rainOfStars', skillType: 'ultimate' });
                    }
                }
            });
        }
    }

    renderSpiritOfForest(ctx, progress) {
        // Use the Spirit of Forest image above the ball (like Last Stand)
        if (window.gameInstance && window.gameInstance.images.spiritOfForest) {
            const img = window.gameInstance.images.spiritOfForest;
            if (img.complete) {
                const size = this.size * 2; // Half the ball size (ball diameter / 2 = radius * 2)
                const x = this.x - size / 2;
                const y = this.y - size / 2 - this.size; // Position above the ball

                ctx.drawImage(img, x, y, size, size);
                return;
            } else {
                console.log('Spirit of Forest image not loaded yet');
            }
        } else {
            console.log('Spirit of Forest image not found in gameInstance.images');
        }

        // Fallback: green circle
        ctx.fillStyle = '#00ff00';
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.arc(this.x, this.y - this.size, this.size / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }

    renderRegeneration(ctx, progress) {
        // Use the Regeneration image
        if (window.gameInstance && window.gameInstance.images.regeneration) {
            const img = window.gameInstance.images.regeneration;
            if (img.complete) {
                const size = this.size * 2; // Match ball size
                const x = this.x - size / 2;
                const y = this.y - size / 2;

                // Fade out over 1 second (progress goes from 0 to 1)
                const alpha = 1 - progress;
                ctx.globalAlpha = alpha;
                ctx.drawImage(img, x, y, size, size);
                ctx.globalAlpha = 1;
                return;
            }
        }

        // Fallback: green sparkle effect
        ctx.fillStyle = '#00ff00';
        ctx.globalAlpha = 1 - progress; // Fade out
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }

    renderFocusedBeam(ctx, progress) {
        // Use the Focused Beam image
        if (window.gameInstance && window.gameInstance.images.focusedBeam) {
            const img = window.gameInstance.images.focusedBeam;
            if (img.complete) {
                // Get start and end positions
                const startX = this.data.startX || this.x;
                const startY = this.data.startY || this.y;
                const targetX = this.data.targetX || this.x;
                const targetY = this.data.targetY || this.y;

                // Calculate distance and angle
                const dx = targetX - startX;
                const dy = targetY - startY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const angle = Math.atan2(dy, dx);

                // Set beam width based on distance (minimum 20, maximum 60)
                const beamWidth = Math.max(20, Math.min(60, distance * 0.1));

                // Fade out over duration
                const alpha = 1 - progress;
                ctx.globalAlpha = alpha;

                // Draw the beam image stretched from start to target
                ctx.save();
                ctx.translate(startX, startY);
                ctx.rotate(angle);
                ctx.drawImage(img, 0, -beamWidth / 2, distance, beamWidth);
                ctx.restore();

                ctx.globalAlpha = 1;
                return;
            }
        }

        // Fallback: purple beam effect
        const startX = this.data.startX || this.x;
        const startY = this.data.startY || this.y;
        const targetX = this.data.targetX || this.x;
        const targetY = this.data.targetY || this.y;

        ctx.strokeStyle = '#9370DB';
        ctx.lineWidth = 8;
        ctx.globalAlpha = 1 - progress; // Fade out
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(targetX, targetY);
        ctx.stroke();
        ctx.globalAlpha = 1;
    }

    renderInfernalChains(ctx, progress) {
        // Use the Infernal Chains frames
        if (window.gameInstance && window.gameInstance.images.infernalChainsFrame1) {
            // Calculate frame index for 1 cycle of 8 frames over 1 second
            const totalFrames = 8;
            const frameIndex = Math.floor(progress * totalFrames) % totalFrames;

            // Get the appropriate frame image
            const frameKey = `infernalChainsFrame${frameIndex + 1}`;
            const img = window.gameInstance.images[frameKey];

            if (img && img.complete) {
                const width = this.size * 2; // Same size as ball
                const height = this.size * 2;
                const x = this.x - width / 2;
                const y = this.y - height / 2;

                // Fade out over duration
                const alpha = 1 - progress;
                ctx.globalAlpha = alpha;
                ctx.drawImage(img, x, y, width, height);
                ctx.globalAlpha = 1;
                return;
            }
        }

        // Fallback: red chain effect
        ctx.strokeStyle = '#ff4400';
        ctx.lineWidth = 4;
        ctx.globalAlpha = 1 - progress; // Fade out
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
    }

    renderSoulLeech(ctx, progress) {
        // Use the Soul Leech frames
        if (window.gameInstance && window.gameInstance.images.soulLeechFrame1) {
            // Calculate frame index for 8 frames over 1 second
            const totalFrames = 8;
            const frameIndex = Math.floor(progress * totalFrames) % totalFrames;

            // Get the appropriate frame image
            const frameKey = `soulLeechFrame${frameIndex + 1}`;
            const img = window.gameInstance.images[frameKey];

            if (img && img.complete) {
                const width = this.size * 2; // Same size as ball
                const height = this.size * 2;

                // Calculate position - start above ball and move upward
                let x, y;
                if (this.followTarget) {
                    // Follow the target ball
                    x = this.followTarget.x - width / 2;
                    y = this.followTarget.y - 30 - (progress * 60) - height / 2; // Start 30px above, move 60px up
                } else {
                    // Fallback positioning
                    x = this.x - width / 2;
                    y = this.y - 30 - (progress * 60) - height / 2;
                }

                // Fade out over duration
                const alpha = 1 - progress;
                ctx.globalAlpha = alpha;
                ctx.drawImage(img, x, y, width, height);
                ctx.globalAlpha = 1;
                return;
            }
        }

        // Fallback: purple soul effect
        let x, y;
        if (this.followTarget) {
            x = this.followTarget.x;
            y = this.followTarget.y - 30 - (progress * 60);
        } else {
            x = this.x;
            y = this.y - 30 - (progress * 60);
        }

        ctx.fillStyle = '#8B008B';
        ctx.globalAlpha = 1 - progress; // Fade out
        ctx.beginPath();
        ctx.arc(x, y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }

    renderApocalypseFlame(ctx, progress) {
        // Use the Apocalypse Flame frames
        if (window.gameInstance && window.gameInstance.images.apocalypseFlameFrame1) {
            // Calculate frame index for 5 cycles of 8 frames over 5 seconds
            const totalFrames = 8;
            const cycles = 5;
            const frameIndex = Math.floor(progress * totalFrames * cycles) % totalFrames;

            // Get the appropriate frame image - use the correct frame naming
            const frameNumber = (frameIndex + 1).toString().padStart(2, '0');
            const frameKey = `apocalypseFlameFrame${frameIndex + 1}`;
            const img = window.gameInstance.images[frameKey];

            if (img && img.complete) {
                const width = this.size * 2; // Same size as specified
                const height = this.size * 2;
                const x = this.x - width / 2;
                const y = this.y - height / 2;

                // No fade out - keep the flame visible for the full duration
                ctx.drawImage(img, x, y, width, height);
                return;
            }
        }

        // Fallback: orange flame effect
        ctx.fillStyle = '#ff4400';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

    renderDemonicAscension(ctx, progress) {
        // Use the Demonic Ascension image
        if (window.gameInstance && window.gameInstance.images.demonicAscension) {
            const img = window.gameInstance.images.demonicAscension;

            if (img && img.complete) {
                const width = this.size * 2; // Same size as ball
                const height = this.size * 2;
                const x = this.x - width / 2;
                const y = this.y - height / 2;

                // No fade out - keep the image visible for the full duration
                ctx.drawImage(img, x, y, width, height);
                return;
            } else {
                console.log('Demonic Ascension image not complete:', img);
            }
        } else {
            console.log('Demonic Ascension image not found in gameInstance.images');
        }

        // Fallback: purple aura effect
        ctx.fillStyle = '#440044';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

    renderDreadAura(ctx, progress) {
        // Use the Dread Aura frames
        if (window.gameInstance && window.gameInstance.images.dreadAuraFrame1) {
            // Calculate frame index for 6 cycles of 8 frames over 2.5 seconds
            const totalFrames = 8;
            const cycles = 6;
            const frameIndex = Math.floor(progress * totalFrames * cycles) % totalFrames;

            // Get the appropriate frame image
            const frameKey = `dreadAuraFrame${frameIndex + 1}`;
            const img = window.gameInstance.images[frameKey];

            if (img && img.complete) {
                const width = this.size * 4; // Double the size of the ball
                const height = this.size * 4;
                const x = this.x - width / 2;
                const y = this.y - height / 2;

                // No fade out - keep the aura visible for the full duration
                ctx.drawImage(img, x, y, width, height);
                return;
            }
        }

        // Fallback: dark aura effect
        ctx.fillStyle = '#440044';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2); // Double the fallback size too
        ctx.fill();
    }

    renderDreadAuraWave(ctx, progress) {
        // Render expanding purple ring (empty inside)
        const startRadius = this.data.startRadius || 0;
        const endRadius = this.data.endRadius || 160;
        const currentRadius = startRadius + (endRadius - startRadius) * progress;
        const lineWidth = this.data.lineWidth || 8;
        const color = this.data.color || '#8B008B';
        const opacity = Math.max(0, 1 - progress * 0.5); // Fade out as it expands

        ctx.save();
        ctx.strokeStyle = color;
        ctx.globalAlpha = opacity;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
    }

    renderElementalBurstWave(ctx, progress) {
        // Render fast expanding orange circle (empty inside)
        const startRadius = this.data.startRadius || 0;
        const endRadius = this.data.endRadius || 60;
        const currentRadius = startRadius + (endRadius - startRadius) * progress;
        const lineWidth = this.data.lineWidth || 6;
        const color = this.data.color || '#FF8C00'; // Orange color
        const opacity = Math.max(0, 1 - progress); // Fade out as it expands

        ctx.save();
        ctx.strokeStyle = color;
        ctx.globalAlpha = opacity;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
    }

    renderWarStomp(ctx, progress) {
        // Use the War Stomp frames
        if (window.gameInstance && window.gameInstance.images.warStompFrame1) {
            // Calculate frame index for 5 frames over 1 second
            const totalFrames = 5;
            const frameIndex = Math.floor(progress * totalFrames) % totalFrames;

            // Get the appropriate frame image
            const frameKey = `warStompFrame${frameIndex + 1}`;
            const img = window.gameInstance.images[frameKey];

            if (img && img.complete) {
                const width = this.size * 2; // Same size as ball
                const height = this.size * 2;
                const x = this.x - width / 2;
                const y = this.y - height / 2;

                // No fade out - keep the animation visible for the full duration
                ctx.drawImage(img, x, y, width, height);
                return;
            }
        }

        // Fallback: brown ground effect
        ctx.fillStyle = '#8B4513';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

    renderUnstoppableRage(ctx, progress) {
        if (window.gameInstance && window.gameInstance.images.unstoppableRageFrame1) {
            const totalFrames = 8;
            const frameIndex = Math.floor(progress * totalFrames * 3) % totalFrames; // Play 3 times over duration
            const frameKey = `unstoppableRageFrame${frameIndex + 1}`;
            const img = window.gameInstance.images[frameKey];

            if (img && img.complete) {
                const width = this.size * 2; // Half the ball size (this.size is already half)
                const height = this.size * 2;
                const x = this.x - width / 2;
                const y = this.y - height / 2;
                ctx.drawImage(img, x, y, width, height);
                return;
            }
        }
        // Fallback: red rage effect
        ctx.fillStyle = '#FF0000';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

    renderEarthshatter(ctx, progress) {
        if (window.gameInstance && window.gameInstance.images.earthshatterFrame1) {
            const totalFrames = 12;
            const frameIndex = Math.floor(progress * totalFrames) % totalFrames;
            const frameKey = `earthshatterFrame${frameIndex + 1}`;
            const img = window.gameInstance.images[frameKey];

            if (img && img.complete) {
                const width = this.size * 2; // Same size as ball
                const height = this.size * 2;
                const x = this.x - width / 2;
                const y = this.y - height / 2;
                ctx.drawImage(img, x, y, width, height);
                return;
            }
        }
        // Fallback: brown ground effect
        ctx.fillStyle = '#8B4513';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

    renderHammerStrike(ctx, progress) {
        if (window.gameInstance && window.gameInstance.images.hammerStrikeFrame1) {
            const totalFrames = 8;
            const frameIndex = Math.min(totalFrames - 1, Math.floor(progress * totalFrames));
            const frameKey = `hammerStrikeFrame${frameIndex + 1}`;
            const img = window.gameInstance.images[frameKey];

            if (img && img.complete && img.naturalWidth > 0) {
                const width = this.size;
                const height = this.size;
                const dropDistance = this.data.dropDistance || this.size;
                const dropOffset = -dropDistance * (1 - progress);
                const x = this.x - width / 2;
                const y = (this.y + dropOffset) - height / 2;
                ctx.drawImage(img, x, y, width, height);
                return;
            } else if (img && img.complete && img.naturalWidth === 0) {
                console.warn(`Hammer Strike frame failed to load: ${frameKey}`);
            }
        }

        // Fallback: simple impact circle
        ctx.fillStyle = '#C0C0C0';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
        ctx.fill();
    }

    renderStoneToss(ctx, progress) {
        if (window.gameInstance && window.gameInstance.images.stoneTossFrame1) {
            const totalFrames = 8;
            const frameIndex = Math.min(totalFrames - 1, Math.floor(progress * totalFrames));
            const frameKey = `stoneTossFrame${frameIndex + 1}`;
            const img = window.gameInstance.images[frameKey];

            if (img && img.complete && img.naturalWidth > 0) {
                const width = this.size;
                const height = this.size;
                const dropDistance = this.data.dropDistance || this.size;
                const dropOffset = -dropDistance * (1 - progress);
                const x = this.x - width / 2;
                const y = (this.y + dropOffset) - height / 2;

                ctx.drawImage(img, x, y, width, height);
                return;
            }
        }

        // Fallback: orange circle impact
        ctx.fillStyle = '#ff6600';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
        ctx.fill();
    }

    renderBattleRoarWave(ctx, progress) {
        const maxRadius = this.data.radius || (this.size / 2);
        const currentRadius = Math.max(0, maxRadius * progress);
        const lineWidth = this.data.lineWidth || 8;
        const opacity = Math.max(0, 1 - progress);
        const innerRadius = Math.max(0, currentRadius - lineWidth);
        const gradient = ctx.createRadialGradient(this.x, this.y, innerRadius, this.x, this.y, currentRadius);
        gradient.addColorStop(0, `rgba(255,0,0,${opacity})`);
        gradient.addColorStop(1, 'rgba(255,0,0,0)');
        ctx.beginPath();
        ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,0,0,${opacity})`;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
    }

    renderWrathOfWarlord(ctx, progress) {
        if (window.gameInstance && window.gameInstance.images.wrathOfWarlordFrame1) {
            const totalFrames = 8;
            const frameIndex = Math.min(totalFrames - 1, Math.floor(progress * totalFrames));
            const frameKey = `wrathOfWarlordFrame${frameIndex + 1}`;
            const img = window.gameInstance.images[frameKey];

            if (img && img.complete && img.naturalWidth > 0) {
                const size = this.size || 80;
                ctx.drawImage(img, this.x - size / 2, this.y - size / 2, size, size);
                return;
            }
        }

        ctx.fillStyle = '#ff8800';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
        ctx.fill();
    }

    renderWrathOfWarlordWave(ctx, progress) {
        const maxRadius = this.data.radius || 250;
        const currentRadius = Math.max(0, maxRadius * progress);
        const lineWidth = this.data.lineWidth || 12;
        const opacity = Math.max(0, 1 - progress);
        ctx.beginPath();
        ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,165,0,${opacity})`;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
    }

    renderHammerOfMountain(ctx, progress) {
        if (window.gameInstance && window.gameInstance.images.hammerOfMountainFrame1) {
            const totalFrames = 6;
            const frameIndex = Math.min(totalFrames - 1, Math.floor(progress * totalFrames));
            const frameKey = `hammerOfMountainFrame${frameIndex + 1}`;
            const img = window.gameInstance.images[frameKey];

            if (img && img.complete && img.naturalWidth > 0) {
                const width = this.size;
                const height = this.size;
                const dropDistance = this.data.dropDistance || this.size;
                const dropOffset = -dropDistance * (1 - progress);
                const x = this.x - width / 2;
                const y = (this.y + dropOffset) - height / 2;

                ctx.drawImage(img, x, y, width, height);
                return;
            }
        }

        ctx.fillStyle = '#ffa500';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
        ctx.fill();
    }

    renderUnbreakableBastion(ctx, progress) {
        if (window.gameInstance && window.gameInstance.images.unbreakableBastionFrame1) {
            const totalFrames = 4;
            const loopDuration = 0.2;
            const elapsed = progress * this.maxDuration;
            const loopProgress = (elapsed % loopDuration) / loopDuration;
            const frameIndex = Math.min(totalFrames - 1, Math.floor(loopProgress * totalFrames));
            const frameKey = `unbreakableBastionFrame${frameIndex + 1}`;
            const img = window.gameInstance.images[frameKey];

            if (img && img.complete && img.naturalWidth > 0) {
                const width = this.size;
                const height = this.size;
                const x = this.x - width / 2;
                const y = this.y - height / 2;

                ctx.drawImage(img, x, y, width, height);
                return;
            }
        }

        ctx.strokeStyle = '#00aaff';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
        ctx.stroke();
    }

    renderUnbreakableBastionWave(ctx, progress) {
        const maxRadius = this.data.radius || 150;
        const currentRadius = Math.max(0, maxRadius * progress);
        const lineWidth = this.data.lineWidth || 8;
        const opacity = Math.max(0, 1 - progress);

        // Draw red circle wave (empty on the inside)
        ctx.beginPath();
        ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,0,0,${opacity})`;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
    }

    renderTwinStrikes(ctx, progress) {
        if (window.gameInstance && window.gameInstance.images.twinStrikesFrame1) {
            const totalFrames = 9;
            const frameIndex = Math.floor(progress * totalFrames) % totalFrames;
            const frameKey = `twinStrikesFrame${frameIndex + 1}`;
            const img = window.gameInstance.images[frameKey];

            if (img && img.complete) {
                const width = this.size * 2; // Same size as ball
                const height = this.size * 2;
                const x = this.x - width / 2;
                const y = this.y - height / 2;
                ctx.drawImage(img, x, y, width, height);
                return;
            }
        }
        // Fallback: blue slash effect
        ctx.fillStyle = '#0080FF';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

    renderWhirlwindSlash(ctx, progress) {
        if (window.gameInstance && window.gameInstance.images.whirlwindFrame1) {
            const totalFrames = 12;
            const frameIndex = Math.floor(progress * totalFrames) % totalFrames;
            const frameKey = `whirlwindFrame${frameIndex + 1}`;
            const img = window.gameInstance.images[frameKey];

            if (img && img.complete) {
                const width = this.size * 2; // Same size as ball
                const height = this.size * 2;
                const x = this.x - width / 2;
                const y = this.y - height / 2;
                ctx.drawImage(img, x, y, width, height);
                return;
            }
        }
        // Fallback: green whirlwind effect
        ctx.fillStyle = '#00FF80';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

}

// Projectile class for ranged attacks
class Projectile {
    constructor(x, y, vx, vy, damage, type, ownerId, targetId = null, context = {}) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.damage = damage;
        this.type = type;
        this.ownerId = ownerId;
        this.targetId = targetId;
        this.radius = context.collisionRadius || 3;
        this.lifetime = 3; // 3 seconds max lifetime
        this.piercing = false;
        this.explosive = false;
        this.explosionRadius = 30;
        this.projectileImageKey = context.projectileImageKey || null;
        this.displaySize = context.projectileSize || 40;
        this.spinSpeed = context.spinSpeed || 0;
        this.alignToDirection = context.alignToDirection !== undefined ? context.alignToDirection : true;
        this.rotation = 0;
        this.dotDamageTotal = context.dotDamageTotal || 0;
        this.dotDuration = context.dotDuration || 0;
        this.skillContext = context.skillName
            ? { skillName: context.skillName, skillType: context.skillType || 'basic', critChance: context.critChance }
            : null;
        this.critChance = context.critChance !== undefined ? context.critChance : null;
    }

    update(balls, canvasWidth, canvasHeight, deltaTime = 0.016) {
        this.lifetime -= deltaTime;
        if (this.spinSpeed) {
            this.rotation = (this.rotation + this.spinSpeed) % (Math.PI * 2);
        }

        // Safety check - ensure balls is an array
        if (!Array.isArray(balls)) {
            return false; // Remove projectile if balls is not an array
        }

        // Heat seeking behavior for Battle Focus projectiles
        if (this.heatSeeking && this.targetId) {
            const target = balls.find(ball => ball.id === this.targetId);
            if (target) {
                const dx = target.x - this.x;
                const dy = target.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance > 0) {
                    // Gradually turn towards target
                    const turnSpeed = 0.1;
                    const targetVx = (dx / distance) * 8;
                    const targetVy = (dy / distance) * 8;

                    this.vx += (targetVx - this.vx) * turnSpeed;
                    this.vy += (targetVy - this.vy) * turnSpeed;
                }
            }
        }

        // Move projectile
        this.x += this.vx;
        this.y += this.vy;

        // Check if projectile is out of bounds
        if (this.x < 0 || this.x > canvasWidth || this.y < 0 || this.y > canvasHeight) {
            return false; // Remove projectile
        }

        // Check if lifetime expired
        if (this.lifetime <= 0) {
            return false; // Remove projectile
        }

        // Check collision with balls
        for (let ball of balls) {
            if (ball.id !== this.ownerId) {
                const distance = Math.sqrt((ball.x - this.x) ** 2 + (ball.y - this.y) ** 2);
                if (distance < ball.radius + this.radius) {
                    // Hit target
                    this.hitTarget(ball, balls);
                    if (!this.piercing) {
                        return false; // Remove projectile
                    }
                }
            }
        }

        return true; // Keep projectile
    }

    hitTarget(target, balls) {
        // Safety check - ensure balls is an array
        if (!Array.isArray(balls)) {
            return;
        }

        // Find owner first for dodge check
        const owner = balls.find(ball => ball.id === this.ownerId);

        // Check for Sylvan Grace dodge - projectiles can be dodged
        if (target.sylvanGraceActive && Math.random() < target.sylvanGraceChance) {
            // Show "Dodged!" text on the target
            if (owner) {
                owner.createFloatingDodgeText(target);
            }
            return; // Entire projectile attack dodged - skip all effects and damage
        }

        // Arrow Storm special handling - only hit each enemy once
        if (this.type === 'arrowStormProjectile' && this.arrowStormHitEnemies) {
            if (this.arrowStormHitEnemies.has(target.id)) {
                return; // Already hit this enemy, skip
            }
            this.arrowStormHitEnemies.add(target.id); // Mark as hit
        }

        // Piercing projectile handling - only hit each enemy once
        if (this.piercing && this.piercingHitEnemies) {
            if (this.piercingHitEnemies.has(target.id)) {
                return; // Already hit this enemy, skip
            }
            this.piercingHitEnemies.add(target.id); // Mark as hit
        }

        // Deal damage to target
        if (owner) {
            // Play hit sound for axeThrow, frenziedSlash, hammerStrike, stoneToss, throwingAxe, hellfireBolt, and infernalChains projectiles
            if (this.type === 'axeThrow' && window.gameInstance) {
                window.gameInstance.playSound('axeThrow');
            } else if (this.type === 'frenziedSlash' && window.gameInstance) {
                window.gameInstance.playSound('frenziedSlash');
            } else if (this.type === 'hammerStrikeProjectile' && window.gameInstance) {
                window.gameInstance.playSound('hammerStrike');
            } else if (this.type === 'stoneTossProjectile' && window.gameInstance) {
                window.gameInstance.playSound('stoneToss');
            } else if (this.type === 'throwingAxe' && window.gameInstance) {
                window.gameInstance.playSound('throwingAxe');
            } else if (this.type === 'hellfireBolt' && window.gameInstance) {
                window.gameInstance.playSound('hellfireBolt');
            } else if (this.type === 'infernalChainsProjectile' && window.gameInstance) {
                window.gameInstance.playSound('infernalChains');
            } else if (this.type === 'arrowStormProjectile' && window.gameInstance) {
                window.gameInstance.playSound('arrowStorm');
            } else if (this.type === 'sylvanMarkArrow' && window.gameInstance) {
                window.gameInstance.playSound('sylvanMarkHit');
            } else if ((this.type === 'arrow' || this.type === 'piercingArrow') && window.gameInstance) {
                // Play random bow hit sound for arrow hits
                window.gameInstance.playRandomBowHitSound();
            } else if ((this.type === 'sword' || this.type === 'dualSword') && window.gameInstance) {
                // Play random sword hit sound for sword hits
                window.gameInstance.playRandomSwordHitSound();
            } else if (this.type === 'elementalBurst' && window.gameInstance) {
                // Play random explosion sound for Elemental Burst hits
                window.gameInstance.playRandomStaffExplosionSound();
            } else if (this.type === 'arcaneBolt' && window.gameInstance) {
                // Play random electric sound for Arcane Bolt hits
                window.gameInstance.playRandomStaffElectricSound();
            } else if (this.type === 'bolt' && window.gameInstance) {
                // Play random crossbow sounds for bolt hits
                if (this.explosive) {
                    window.gameInstance.playRandomCrossbowExplosionSound();

                    // Create hollow orange circle visual effect for explosive bolts
                    window.gameInstance.createVisualEffect(
                        this.x, this.y, 'explosiveBoltCircle', 0.5, { size: 50 }
                    );
                } else {
                    window.gameInstance.playRandomCrossbowHitSound();
                }
            }

            if (this.type === 'hammerStrikeProjectile') {
                owner.createHammerStrikeEffect(target);
            } else if (this.type === 'stoneTossProjectile') {
                owner.createStoneTossEffect(target);
            } else if (this.type === 'infernalChainsProjectile') {
                // Apply root and damage on hit
                owner.applyInfernalChainsOnHit(target);
            } else if (this.type === 'elementalBurst') {
                // Create orange wave visual effect
                owner.createElementalBurstWaveEffect(target);
            }

            // Use stored context if available, otherwise determine from owner
            let skillContext = this.skillContext
                ? { ...this.skillContext }
                : null;
            if (!skillContext || !skillContext.skillName) {
                skillContext = { skillName: 'Projectile', skillType: 'basic' };
                if (owner.attack) {
                    skillContext = { skillName: owner.attack, skillType: 'basic' };
                }
            }
            // Mark as projectile and that dodge was already checked in hitTarget
            skillContext.isProjectile = true;
            skillContext.dodgeAlreadyChecked = true;

            // Special handling for frenziedSlash - deal 3 damage 3 times (9 total)
            if (this.type === 'frenziedSlash') {
                // Deal first hit immediately
                owner.dealDamage(target, 3, skillContext);
                // Deal second hit after 100ms
                setTimeout(() => {
                    if (target && target.hp > 0) {
                        owner.dealDamage(target, 3, skillContext);
                    }
                }, 100);
                // Deal third hit after 200ms
                setTimeout(() => {
                    if (target && target.hp > 0) {
                        owner.dealDamage(target, 3, skillContext);
                    }
                }, 200);
            } else if (this.type === 'infernalChainsProjectile') {
                // Damage is handled in applyInfernalChainsOnHit, don't deal damage here
            } else {
                owner.dealDamage(target, this.damage, skillContext);
            }

            if (this.dotDamageTotal > 0 && this.dotDuration > 0) {
                owner.dealDamageOverTime(
                    target,
                    this.dotDamageTotal,
                    this.dotDuration,
                    { ...skillContext }
                );
            }

            // Create visual effects for basic attack projectiles (only sword projectiles)
            if (this.type === 'sword' && owner.attack === 'heavySlash') {
                owner.createAttackEffect(target, 'heavySlash');
            } else if (this.type === 'sword' && owner.attack === 'quickJab') {
                owner.createAttackEffect(target, 'quickJab');

                // Quick Jab has 30% chance for double attack
                if (Math.random() < 0.3) {
                    // Create second attack effect after 0.5 seconds
                    setTimeout(() => {
                        owner.createAttackEffect(target, 'quickJab');
                        // Deal damage again for double attack
                        owner.dealDamage(target, this.damage, { skillName: owner.attack, skillType: 'basic' });
                    }, 500);
                }
            } else if (this.type === 'sword' && owner.attack === 'shieldBreaker') {
                owner.createAttackEffect(target, 'shieldBreaker');
            } else if (this.type === 'dualSword' && owner.attack === 'twinStrikes') {
                owner.createTwinStrikesEffect(target);
            } else if (this.type === 'dualSword' && owner.attack === 'whirlwindSlash') {
                owner.createWhirlwindSlashEffect(target);
            }

            // Special handling for sword and dual sword projectiles - deactivate weapon and set cooldown
            if (this.type === 'sword' || this.type === 'dualSword') {
                owner.deactivateWeapon();
                owner.basicAttackCooldown = 1.2; // 1.2 second cooldown
            }
        }

        // Handle explosive projectiles
        if (this.explosive) {
            balls.forEach(ball => {
                if (ball.id !== this.ownerId) {
                    const distance = Math.sqrt((ball.x - this.x) ** 2 + (ball.y - this.y) ** 2);
                    if (distance < this.explosionRadius) {
                        const explosionDamage = this.damage * 0.7;
                        if (owner) {
                            owner.dealDamage(ball, explosionDamage, { skillName: owner.attack || 'Explosion', skillType: 'basic' });
                        }
                    }
                }
            });
        }
    }

    render(ctx) {
        // Special rendering for Arrow Storm projectile - animated frames while traveling
        if (this.type === 'arrowStormProjectile' && this.isArrowStorm && window.gameInstance) {
            const elapsed = Date.now() - this.arrowStormStartTime;
            const progress = Math.min(elapsed / this.arrowStormDuration, 1);

            // Calculate which frame to show (1-8)
            const frameIndex = Math.floor(progress * 8);
            const frameNumber = Math.min(frameIndex + 1, 8);
            const frameKey = `arrowStormFrame${frameNumber}`;
            const img = window.gameInstance.images[frameKey];

            if (img && img.complete) {
                const size = 120; // Size of the arrow storm animation (twice as big)
                // Rotate to face direction of travel
                // Image is designed to point downward (0,1), so subtract PI/2 to correct
                const angle = Math.atan2(this.vy, this.vx) - Math.PI / 2;

                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(angle);
                ctx.drawImage(img, -size / 2, -size / 2, size, size);
                ctx.restore();
                return;
            }
        }

        if (this.projectileImageKey && window.gameInstance && window.gameInstance.images[this.projectileImageKey]) {
            const img = window.gameInstance.images[this.projectileImageKey];
            if (img && img.complete && img.naturalWidth > 0) {
                const size = this.displaySize || (this.radius * 2);
                const directionAngle = this.alignToDirection ? Math.atan2(this.vy, this.vx) : 0;
                const totalAngle = directionAngle + (this.spinSpeed ? this.rotation : 0);

                ctx.save();
                ctx.translate(this.x, this.y);

                // Special rotation for crossbow bolts that point at (1,1)
                if (this.projectileImageKey === 'crossbowBolt' || this.projectileImageKey === 'crossbowExplosiveBolt') {
                    ctx.rotate(totalAngle + Math.PI / 4); // Corrected: -45 deg for (1,1) plus 90 deg right tilt
                } else {
                    ctx.rotate(totalAngle);
                }

                ctx.drawImage(img, -size / 2, -size / 2, size, size);
                ctx.restore();
                return;
            }
        }

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

        // Different colors for different projectile types
        switch (this.type) {
            case 'arrow':
                // Use the Arrow image for regular arrows
                if (window.gameInstance && window.gameInstance.images.arrow) {
                    const img = window.gameInstance.images.arrow;
                    if (img.complete) {
                        const size = 80; // Doubled from 40 to 80 as requested
                        const angle = Math.atan2(this.vy, this.vx) + Math.PI / 2; // Add 90 degrees to correct orientation

                        ctx.save();
                        ctx.translate(this.x, this.y);
                        ctx.rotate(angle);
                        ctx.drawImage(img, -size / 2, -size / 2, size, size);
                        ctx.restore();
                        return; // Skip the default circle rendering
                    }
                }
                ctx.fillStyle = '#8B4513';
                break;
            case 'piercingArrow':
                // Use the Piercing Arrow image for piercing arrows
                if (window.gameInstance && window.gameInstance.images.piercingArrow) {
                    const img = window.gameInstance.images.piercingArrow;
                    if (img.complete) {
                        const size = 80; // Doubled from 40 to 80 as requested
                        const angle = Math.atan2(this.vy, this.vx) + Math.PI / 2; // Add 90 degrees to correct orientation

                        ctx.save();
                        ctx.translate(this.x, this.y);
                        ctx.rotate(angle);
                        ctx.drawImage(img, -size / 2, -size / 2, size, size);
                        ctx.restore();
                        return; // Skip the default circle rendering
                    }
                }
                ctx.fillStyle = '#8B4513';
                break;
            case 'bolt':
                ctx.fillStyle = '#C0C0C0';
                break;
            case 'magic':
                ctx.fillStyle = '#9370DB';
                break;
            case 'elementalBurst':
                // Use the Elemental Burst image
                if (window.gameInstance && window.gameInstance.images.elementalBurst) {
                    const img = window.gameInstance.images.elementalBurst;
                    if (img.complete) {
                        const size = 40; // Same size as arrows
                        const angle = Math.atan2(this.vy, this.vx) + Math.PI / 2; // Add 90 degrees to correct orientation

                        ctx.save();
                        ctx.translate(this.x, this.y);
                        ctx.rotate(angle);
                        ctx.drawImage(img, -size / 2, -size / 2, size, size);
                        ctx.restore();
                        return; // Skip the default circle rendering
                    }
                }
                ctx.fillStyle = '#9370DB';
                break;
            case 'arcaneBolt':
                // Use the Arcane Bolt image
                if (window.gameInstance && window.gameInstance.images.arcaneBolt) {
                    const img = window.gameInstance.images.arcaneBolt;
                    if (img.complete) {
                        const size = 40; // Same size as arrows
                        const angle = Math.atan2(this.vy, this.vx) + Math.PI / 2; // Add 90 degrees to correct orientation

                        ctx.save();
                        ctx.translate(this.x, this.y);
                        ctx.rotate(angle);
                        ctx.drawImage(img, -size / 2, -size / 2, size, size);
                        ctx.restore();
                        return; // Skip the default circle rendering
                    }
                }
                ctx.fillStyle = '#9370DB';
                break;
            case 'explosive':
                ctx.fillStyle = '#FF4500';
                break;
            case 'sylvanMarkArrow':
                // Use the Sylvan Mark Arrow image
                if (window.gameInstance && window.gameInstance.images.sylvanMarkArrow) {
                    const img = window.gameInstance.images.sylvanMarkArrow;
                    if (img.complete) {
                        const size = 100; // 5x the previous size (20 * 5 = 100)
                        const angle = Math.atan2(this.vy, this.vx) + Math.PI / 2; // Add 90 degrees (π/2) to correct the orientation

                        ctx.save();
                        ctx.translate(this.x, this.y);
                        ctx.rotate(angle);
                        ctx.drawImage(img, -size / 2, -size / 2, size, size);
                        ctx.restore();
                        return; // Skip the default circle rendering
                    }
                }
                ctx.fillStyle = '#00ff00'; // Fallback color
                break;
            case 'hellfireBolt':
                // Use the Hellfire Bolt image
                if (window.gameInstance && window.gameInstance.images.hellfireBolt) {
                    const img = window.gameInstance.images.hellfireBolt;
                    if (img.complete) {
                        const size = 40; // Same size as other projectiles
                        const angle = Math.atan2(this.vy, this.vx) + Math.PI / 4; // Add 45 degrees (π/4) to correct orientation

                        ctx.save();
                        ctx.translate(this.x, this.y);
                        ctx.rotate(angle);
                        ctx.drawImage(img, -size / 2, -size / 2, size, size);
                        ctx.restore();
                        return; // Skip the default circle rendering
                    }
                }
                ctx.fillStyle = '#FF4500'; // Fallback color
                break;
            case 'throwingAxe':
                // Use the Throwing Axe image
                if (window.gameInstance && window.gameInstance.images.throwingAxe) {
                    const img = window.gameInstance.images.throwingAxe;
                    if (img.complete) {
                        const size = 80; // Double the size for better visibility
                        // Calculate rotation based on projectile lifetime for spinning effect
                        const spinSpeed = 0.8; // Increased rotation speed
                        const time = (3 - this.lifetime) * spinSpeed; // 3 is max lifetime
                        const spinAngle = time * Math.PI * 2; // Full 360-degree rotation
                        const directionAngle = Math.atan2(this.vy, this.vx);
                        const totalAngle = directionAngle + spinAngle;

                        ctx.save();
                        ctx.translate(this.x, this.y);
                        ctx.rotate(totalAngle);
                        ctx.drawImage(img, -size / 2, -size / 2, size, size);
                        ctx.restore();
                        return; // Skip the default circle rendering
                    }
                }
                ctx.fillStyle = '#8B4513'; // Fallback color
                break;
            case 'sword':
                // Use the sword image
                if (window.gameInstance && window.gameInstance.images.sword) {
                    const img = window.gameInstance.images.sword;
                    if (img.complete) {
                        const size = 40;
                        const angle = Math.atan2(this.vy, this.vx) + Math.PI / 2 + Math.PI / 4; // Rotate to face direction, tilted 45 degrees right

                        ctx.save();
                        ctx.translate(this.x, this.y);
                        ctx.rotate(angle);
                        ctx.drawImage(img, -size / 2, -size / 2, size, size);
                        ctx.restore();
                        return; // Skip the default circle rendering
                    }
                }
                ctx.fillStyle = '#C0C0C0'; // Fallback color
                break;
            case 'dualSword':
                // Use two sword images on opposite sides
                if (window.gameInstance && window.gameInstance.images.sword) {
                    const img = window.gameInstance.images.sword;
                    if (img.complete) {
                        const size = 40;
                        const angle = Math.atan2(this.vy, this.vx) + Math.PI / 2; // Base direction

                        // Draw first sword
                        ctx.save();
                        ctx.translate(this.x, this.y);
                        ctx.rotate(angle + Math.PI / 4); // 45 degrees right tilt
                        ctx.drawImage(img, -size / 2, -size / 2, size, size);
                        ctx.restore();

                        // Draw second sword (opposite side)
                        ctx.save();
                        ctx.translate(this.x, this.y);
                        ctx.rotate(angle + Math.PI + Math.PI / 4); // 180 degrees + 45 degrees right tilt
                        ctx.drawImage(img, -size / 2, -size / 2, size, size);
                        ctx.restore();
                        return; // Skip the default circle rendering
                    }
                }
                ctx.fillStyle = '#C0C0C0'; // Fallback color
                break;
            case 'axeThrow':
                // Use the Axe Throw image with same spinning as throwing axe
                if (window.gameInstance && window.gameInstance.images.axeThrow) {
                    const img = window.gameInstance.images.axeThrow;
                    if (img.complete) {
                        const size = 80; // 2x the size of throwing axe (40 * 2)
                        // Calculate rotation based on projectile lifetime for spinning effect
                        const spinSpeed = 0.8; // Same rotation speed as throwing axe
                        const time = (3 - this.lifetime) * spinSpeed; // 3 is max lifetime
                        const spinAngle = time * Math.PI * 2; // Full 360-degree rotation
                        const directionAngle = Math.atan2(this.vy, this.vx);
                        const totalAngle = directionAngle + spinAngle;

                        ctx.save();
                        ctx.translate(this.x, this.y);
                        ctx.rotate(totalAngle);
                        ctx.drawImage(img, -size / 2, -size / 2, size, size);
                        ctx.restore();
                        return; // Skip the default circle rendering
                    }
                }
                ctx.fillStyle = '#8B4513'; // Fallback color
                break;
            case 'frenziedSlash':
                // Use the Frenzied Slash image with 45-degree right tilt
                if (window.gameInstance && window.gameInstance.images.frenziedSlash) {
                    const img = window.gameInstance.images.frenziedSlash;
                    if (img.complete) {
                        const size = 60; // 1.5x bigger (40 * 1.5)
                        const angle = Math.atan2(this.vy, this.vx) + Math.PI / 4; // 45 degrees right tilt

                        ctx.save();
                        ctx.translate(this.x, this.y);
                        ctx.rotate(angle);
                        ctx.drawImage(img, -size / 2, -size / 2, size, size);
                        ctx.restore();
                        return; // Skip the default circle rendering
                    }
                }
                ctx.fillStyle = '#FF4500'; // Fallback color
                break;
            default:
                ctx.fillStyle = '#FFD700';
        }

        ctx.fill();

        // Add trail effect
        ctx.strokeStyle = ctx.fillStyle;
        ctx.lineWidth = 1;
        ctx.stroke();
    }
}

// Ball class will be defined in the next part
class Ball {
    constructor(id, name, race, weapon, attack, skill, ultimate, x, y, selectedPassive) {
        this.id = id;
        this.name = name;
        this.race = race;
        this.weapon = weapon;
        this.attack = attack;
        this.skill = skill;
        this.ultimate = ultimate;
        this.selectedPassive = selectedPassive;

        // Custom Image Loading
        this.customImage = null;
        this.imageLoaded = false;

        if (this.name) {
            const img = new Image();
            img.onload = () => {
                this.imageLoaded = true;
                this.customImage = img;
            };
            img.onerror = () => {
                // If lowercase failed, try original case
                const img2 = new Image();
                img2.onload = () => {
                    this.imageLoaded = true;
                    this.customImage = img2;
                };
                img2.onerror = () => {
                    this.imageLoaded = false;
                    this.customImage = null;
                };
                img2.src = `player%20images/${encodeURIComponent(this.name)}.png`;
            };
            img.src = `player%20images/${encodeURIComponent(this.name.toLowerCase())}.png`;
        }

        // Position and movement
        this.x = x;
        this.y = y;
        // Start with random velocity in any direction
        const angle = Math.random() * Math.PI * 2;
        const speed = 3 + Math.random() * 2; // Speed between 3-5
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.radius = 20;

        // Stats based on race
        this.setRaceStats();

        // Cooldowns - start on cooldown so skills aren't immediately available
        // Focused Beam has a longer cooldown
        this.basicAttackCooldown = (attack === 'focusedBeam') ? 3 : 1.2; // Basic attack cooldown
        this.activeSkillCooldown = 4;   // Active skill cooldown
        this.ultimateCooldown = 12;     // Ultimate cooldown

        // Status effects
        this.stunDuration = 0;
        this.rooted = false;
        this.rootDuration = 0;
        this.slowEffect = 1; // 1 = normal speed, < 1 = slowed
        this.slowDuration = 0;

        // Dread Aura pull effect
        this.dreadAuraPulled = false;
        this.dreadAuraPullTarget = null;
        this.dreadAuraPullDuration = 0;
        this.dreadAuraTrailTimer = 0;

        // Effects
        this.effects = [];

        // Weapon state for melee weapons
        this.weaponActive = false;
        this.weaponEffect = null;
        this.weaponRotation = 0;

        // AI state
        this.aiTarget = null;
        this.aiState = 'wandering';

        // Fortify state
        this.fortifyActive = false;
        this.fortifyStacks = 0;
        this.fortifyCooldownDuration = 5;
        this.lastFortifyStackConsumed = 0; // Timestamp to prevent sound spam

        // Rune Charge state
        this.runeChargeActive = false;
        this.runeChargeStacks = 0;
        this.runeChargeCooldownDuration = 5;
        this.runeChargeAnimationStart = null;

        // Battle Roar state
        this.battleRoarBonusStacks = 0;
        this.battleRoarDebuffStacks = 0;
        this.battleRoarAnimationStart = null;

        // Headbutt state
        this.headbuttActive = false;
        this.headbuttTargetId = null;
        this.headbuttSpeed = 6;
        this.headbuttStoredVelocity = null;

        // Blood Frenzy state
        this.bloodFrenzyStacks = 0;
        this.bloodFrenzyActive = false;
        this.bloodFrenzyAnimationStart = null;

        // Fear state
        this.feared = false;
        this.fearDuration = 0;

        // Wrath of the Warlord state
        this.wrathOfWarlordActive = false;
        this.wrathEffectPosition = null;
        this.wrathStoredVelocity = null;

        // Unbreakable Bastion state
        this.unbreakableBastionActive = false;
        this.unbreakableBastionShieldValue = 0;
        this.unbreakableBastionShieldMax = 0;
        this.unbreakableBastionStoredVelocity = null;
        this.unbreakableBastionPosition = null;

        // Taunt state
        this.tauntTargetId = null;
        this.tauntDuration = 0;

        // Spirit Bond (Passive)
        this.spiritBondActive = false;
        this.spiritBondTimer = 10; // Reset to 10s cooldown
        this.spiritBondBuffTimer = 0;
        this.activeEagles = [];

        // Unstoppable Strength state
        this.unstoppableStrengthActive = false;
        this.unstoppableStrengthDuration = 0;
        this.unstoppableStrengthAnimationStart = null;
        this.immuneToCC = false;

        // Ale-Fueled Resilience state
        this.aleFueledResilienceDuration = 0;
    }

    setRaceStats() {
        const raceStats = {
            human: { maxHp: 220, defense: 0, critChance: 0.1 },
            demon: { maxHp: 170, defense: 1, critChance: 0.15 },
            orc: { maxHp: 190, defense: 1, critChance: 0.1 },
            elf: { maxHp: 160, defense: 2, critChance: 0.2 },
            dwarf: { maxHp: 200, defense: 1, critChance: 0.1 },
            barbarian: { maxHp: 180, defense: 0, critChance: 0.2 }
        };

        const stats = raceStats[this.race];
        this.maxHp = stats.maxHp;
        this.hp = this.maxHp;
        this.defense = stats.defense;
        this.critChance = stats.critChance;
        this.baseCritChance = stats.critChance; // Store base crit chance for bonuses

        // Initialize passive skills - only the selected one
        this.passiveSkills = this.selectedPassive ? [this.selectedPassive] : [];
        this.battleTime = 0;
        this.tacticalRecallUsed = false;
        this.copiedPassive = null;

        // Initialize buff stacks
        this.executionStrikeStacks = 0;
        this.battleFocusStacks = 0;
        this.shieldBashActive = false;
        this.shieldBashDefenseBonus = 0;
        this.shieldBashDefenseDuration = 0;
        this.shadowstepDamageBonus = 0;
        this.lastStandActive = false;
        this.shield = 0;
        this.grappleSlamActive = false;
        this.hellfireAuraActive = false;
        this.corruptedHealing = 0;
        this.shadowPuppeteerActive = false;
        this.shadowPuppeteerChance = 0.05; // 5% chance
        this.bloodPactUsed = false;
        this.ironhideBonus = 0;
        this.boneCrusherBonus = 0;
        this.sylvanGraceChance = 0.1;
        this.manaAffinityBonus = 0.3;
        this.keenSightBonus = 0.3;
        this.keenSightApplied = false;
        this.ancientWisdomBonus = 0.3;
        this.stonefleshBonus = 0;
        this.runesmithChance = 0.05;
        this.bloodRageBonus = 0;
        this.berserkerHits = 0;
        this.savageMomentumStacks = 0;
        this.bonebreakerBonus = 0;
    }

    getPassiveSkillsForRace() {
        const passiveSkills = {
            human: [
                'battleHardened',
                'tacticalRecall',
                'jackOfAllTrades',
                'resourcefulMind'
            ],
            demon: [
                'soulReaping',
                'hellfireAura',
                'painEmpowerment',
                'corruptedRegeneration',
                'shadowPuppeteer',
                'bloodPact',
                'chainsOfDespair'
            ],
            orc: [
                'bloodrage',
                'ironhide',
                'boneCrusher',
                'unbreakableWill',
                'battleScars'
            ],
            elf: [
                'sylvanGrace',
                'manaAffinity',
                'forestsBlessing',
                'keenSight',
                'naturesWhisper',
                'ancientWisdom',
                'spiritBond'
            ],
            dwarf: [
                'stoneflesh',
                'ironWill',
                'aleFueledResilience',
                'runesmithsBlessing',
                'deepminersStamina',
                'mountainsEndurance'
            ],
            barbarian: [
                'bloodRage',
                'berserkersEndurance',
                'warCry',
                'savageMomentum',
                'bonebreaker',
                'huntersInstinct',
                'ragingSpirit'
            ]
        };

        return passiveSkills[this.race] || [];
    }

    applyPassiveSkills() {
        this.passiveSkills.forEach(skill => {
            const functionName = `apply${skill.charAt(0).toUpperCase() + skill.slice(1)}`;
            if (typeof this[functionName] === 'function') {
                this[functionName]();
            } else {
                console.warn(`Passive skill function not found: ${functionName} for skill: ${skill}`);
            }
        });
    }

    applyBattleHardened() {
        // +1% damage and defense every second
        this.battleTime += this._deltaTime || 0.016;
        const bonus = Math.floor(this.battleTime);
        this.damageBonus = bonus * 0.01;
        this.defenseBonus = bonus * 0.01;
    }

    applyTacticalRecall() {
        // Auto-save from death once per game
        if (this.hp <= 0 && !this.tacticalRecallUsed) {
            this.hp = this.maxHp * 0.5;
            this.tacticalRecallUsed = true;
        }
    }

    applyJackOfAllTrades() {
        // Copy enemy's passive skill at start of battle
        // The actual copying happens in Game.startGame() when balls are created
        // This function is called every frame but doesn't need to do anything
        // since the copied passive is already in passiveSkills array and will be applied
    }

    applyResourcefulMind() {
        // Speed boost when health below 50%
        if (this.hp < this.maxHp * 0.5) {
            this.speedBonus = 1.5;
        } else {
            this.speedBonus = 1;
        }
    }

    applySoulReaping() {
        // Heal when dealing damage
        this.soulReapingActive = true;
    }

    applyHellfireAura() {
        // Enemies near take damage
        this.hellfireAuraActive = true;
    }

    applyPainEmpowerment() {
        // More damage as health gets lower
        const healthPercent = this.hp / this.maxHp;
        this.painEmpowermentBonus = (1 - healthPercent) * 0.5;
    }

    applyCorruptedRegeneration() {
        // Heal over time, but die if heal more than 200
        const deltaTime = this._deltaTime || 0.016;
        this.corruptedHealing += 0.5 * deltaTime; // 0.5 HP per second
        if (this.corruptedHealing >= 200) {
            this.hp = 0;
        } else {
            const hpBefore = this.hp;
            this.hp = Math.min(this.maxHp, this.hp + 0.5 * deltaTime);
            if (this.hp > hpBefore) {
                this.triggerAleFueledResilience();
            }
        }
    }

    applyShadowPuppeteer() {
        // Shadow Puppeteer is always active when this passive is selected
        this.shadowPuppeteerActive = true;
    }

    checkShadowPuppeteerCancel(target) {
        // Check if target has Shadow Puppeteer and if it cancels this move (5% chance)
        if (target && target.shadowPuppeteerActive) {
            if (Math.random() < target.shadowPuppeteerChance) { // 5% chance
                this.showCancelledMessage();
                return true; // Move cancelled
            }
        }
        return false; // Move not cancelled
    }

    showCancelledMessage() {
        if (!window.gameInstance) return;

        // Create floating text effect above the ball
        const textEffect = {
            x: this.x,
            y: this.y - this.radius - 20,
            text: 'Cancelled!',
            color: '#ff0000', // Red
            fontSize: 18,
            duration: 1.0, // 1 second
            startTime: Date.now(),
            followTarget: this,
            offsetY: -this.radius - 20
        };

        // Store in game instance for rendering
        if (!window.gameInstance.cancelledMessages) {
            window.gameInstance.cancelledMessages = [];
        }
        window.gameInstance.cancelledMessages.push(textEffect);

        // Remove after duration
        setTimeout(() => {
            if (window.gameInstance && window.gameInstance.cancelledMessages) {
                const index = window.gameInstance.cancelledMessages.indexOf(textEffect);
                if (index > -1) {
                    window.gameInstance.cancelledMessages.splice(index, 1);
                }
            }
        }, 1000);
    }

    applyBloodPact() {
        // When about to die, sacrifice HP to stay alive with 1 HP
        if (this.hp <= this.maxHp * 0.1 && !this.bloodPactUsed) {
            this.hp = 1;
            this.bloodPactUsed = true;
            this.bloodPactDamage = 15;
        }
    }

    applyChainsOfDespair() {
        // Enemies hit have reduced cooldown speed
        this.chainsOfDespairActive = true;
    }

    applyBloodrage() {
        // More damage as health gets lower
        const healthPercent = this.hp / this.maxHp;
        this.bloodrageBonus = (1 - healthPercent) * 0.3;
    }

    applyIronhide() {
        // +1 defense
        this.ironhideBonus = 1;
    }

    applyBoneCrusher() {
        // +3 damage against armored enemies
        this.boneCrusherBonus = 3;
    }

    applyUnbreakableWill() {
        // Reduced effects from debuffs
        this.unbreakableWillActive = true;
    }

    checkCCDodge() {
        // 10% chance to dodge CC effects (stuns, roots, fears)
        if (this.unbreakableWillActive && Math.random() < 0.1) {
            this.showCCDodgeMessage();
            return true; // CC dodged
        }
        return false; // CC not dodged
    }

    showCCDodgeMessage() {
        if (!window.gameInstance) return;

        // Create floating text effect above the ball
        const textEffect = {
            x: this.x,
            y: this.y - this.radius - 20,
            text: 'Dodged CC',
            color: '#ff0000', // Red
            fontSize: 16,
            duration: 1.0, // 1 second
            startTime: Date.now(),
            followTarget: this,
            offsetY: -this.radius - 20
        };

        // Store in game instance for rendering
        if (!window.gameInstance.ccDodgeMessages) {
            window.gameInstance.ccDodgeMessages = [];
        }
        window.gameInstance.ccDodgeMessages.push(textEffect);

        // Remove after duration
        setTimeout(() => {
            if (window.gameInstance && window.gameInstance.ccDodgeMessages) {
                const index = window.gameInstance.ccDodgeMessages.indexOf(textEffect);
                if (index > -1) {
                    window.gameInstance.ccDodgeMessages.splice(index, 1);
                }
            }
        }, 1000);
    }

    applyBattleScars() {
        // Small health regeneration
        const deltaTime = this._deltaTime || 0.016;
        const hpBefore = this.hp;
        this.hp = Math.min(this.maxHp, this.hp + 0.2 * deltaTime);
        if (this.hp > hpBefore) {
            this.triggerAleFueledResilience();
        }
    }

    applySylvanGrace() {
        // 10% chance to dodge attacks
        this.sylvanGraceActive = true;
    }

    applyManaAffinity() {
        // 30% faster cooldowns and skill damage boost
        this.manaAffinityActive = true;
    }

    getCooldownReductionMultiplier() {
        // Returns the multiplier for cooldown reduction (1.0 = normal, >1.0 = faster)
        let multiplier = 1.0;
        if (this.manaAffinityActive) multiplier *= 1.3; // 30% faster
        if (this.ancientWisdomActive) multiplier *= 1.3; // 30% faster
        return multiplier;
    }

    applyCooldownReduction(baseCooldown) {
        // Applies cooldown reduction to a base cooldown value
        const multiplier = this.getCooldownReductionMultiplier();
        return baseCooldown / multiplier;
    }

    applyForestsBlessing() {
        // Heal when speed is less than 5
        const deltaTime = this._deltaTime || 0.016;
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (speed < 5) {
            const hpBefore = this.hp;
            this.hp = Math.min(this.maxHp, this.hp + 0.3 * deltaTime);
            if (this.hp > hpBefore) {
                this.triggerAleFueledResilience();
            }
        }
    }

    applyKeenSight() {
        // 30% crit chance - only apply once, not every frame
        if (!this.keenSightApplied) {
            this.critChance = this.baseCritChance + this.keenSightBonus;
            this.keenSightApplied = true;
        }
    }

    applyNaturesWhisper() {
        // Speed and accuracy buffs
        this.naturesWhisperActive = true;
    }

    applyAncientWisdom() {
        // 30% reduced cooldowns
        this.ancientWisdomActive = true;
    }

    applySpiritBond() {
        // Summon animal spirit for support
        this.spiritBondActive = true;
    }

    updateSpiritBond(deltaTime, canvasWidth, canvasHeight) {
        if (!this.spiritBondActive) return;

        // Update Cooldown
        if (this.spiritBondTimer > 0) {
            this.spiritBondTimer -= deltaTime;
            if (this.spiritBondTimer <= 0) {
                // Spawn Eagle
                this.spawnEagle(canvasWidth, canvasHeight);
                this.spiritBondTimer = 10; // Reset timer
                this.spiritBondBuffTimer = 3; // 3 seconds buff

                // Play sounds
                if (window.gameInstance) {
                    window.gameInstance.playSound('eagleCall');
                    window.gameInstance.playSound('eagleFlap');
                }
            }
        }

        // Update Buff Timer
        if (this.spiritBondBuffTimer > 0) {
            this.spiritBondBuffTimer -= deltaTime;
        }

        // Update Active Eagles
        for (let i = this.activeEagles.length - 1; i >= 0; i--) {
            const eagle = this.activeEagles[i];

            // Move
            eagle.x += eagle.vx;
            eagle.y += eagle.vy;

            // Animate
            eagle.animationTimer += deltaTime;
            if (eagle.animationTimer >= 0.15) { // 0.3s total for 2 frames = 0.15 per frame
                eagle.animationTimer = 0;
                eagle.frame = eagle.frame === 1 ? 2 : 1;
            }

            // Remove if out of bounds (give some buffer)
            if (eagle.x < -100 || eagle.x > canvasWidth + 100 ||
                eagle.y < -100 || eagle.y > canvasHeight + 100) {
                this.activeEagles.splice(i, 1);
            }
        }
    }

    spawnEagle(canvasWidth, canvasHeight) {
        // Random spawn side: 0=Left, 1=Right, 2=Top, 3=Bottom
        const side = Math.floor(Math.random() * 4);
        const speed = 2.5; // Reduced speed as requested
        let x, y, vx, vy, rotation;

        switch (side) {
            case 0: // Left -> Right
                x = -50;
                y = Math.random() * canvasHeight;
                vx = speed;
                vy = (Math.random() - 0.5) * 2; // Slight vertical variation
                rotation = 0;
                break;
            case 1: // Right -> Left
                x = canvasWidth + 50;
                y = Math.random() * canvasHeight;
                vx = -speed;
                vy = (Math.random() - 0.5) * 2;
                rotation = Math.PI;
                break;
            case 2: // Top -> Bottom
                x = Math.random() * canvasWidth;
                y = -50;
                vx = (Math.random() - 0.5) * 2;
                vy = speed;
                rotation = Math.PI / 2;
                break;
            case 3: // Bottom -> Top
                x = Math.random() * canvasWidth;
                y = canvasHeight + 50;
                vx = (Math.random() - 0.5) * 2;
                vy = -speed;
                rotation = -Math.PI / 2;
                break;
        }

        // Adjust rotation based on exact velocity
        // Add Math.PI because the base image faces left and atan2 assumes right-facing
        rotation = Math.atan2(vy, vx) + Math.PI;

        this.activeEagles.push({
            x: x,
            y: y,
            vx: vx,
            vy: vy,
            rotation: rotation,
            frame: 1,
            animationTimer: 0
        });
    }

    renderSpiritBond(ctx) {
        if (!this.spiritBondActive) return;

        this.activeEagles.forEach(eagle => {
            const imageKey = `eagle${eagle.frame}`;
            const image = window.gameInstance ? window.gameInstance.images[imageKey] : null;

            if (image) {
                ctx.save();
                ctx.translate(eagle.x, eagle.y);
                ctx.rotate(eagle.rotation);
                // Assume eagle looks right by default. Size? Let's say 60x60
                ctx.drawImage(image, -30, -30, 60, 60);
                ctx.restore();
            }
        });
    }

    applyStoneflesh() {
        // +2 physical resistance
        this.stonefleshBonus = 2;
    }

    applyIronWill() {
        // Negative effects wear off faster
        this.ironWillActive = true;
    }

    applyCCDurationReduction(duration) {
        // Iron Will reduces CC duration by 20%
        if (this.ironWillActive) {
            return duration * 0.8;
        }
        return duration;
    }

    applyAleFueledResilience() {
        // Damage resistance when healing
        this.aleFueledResilienceActive = true;
        this.aleFueledResilienceDuration = 0; // Will be set when healing occurs
    }

    triggerAleFueledResilience() {
        // Triggered when healing occurs - resets duration to 3 seconds (doesn't stack)
        if (this.aleFueledResilienceActive) {
            this.aleFueledResilienceDuration = 3;
        }
    }

    applyRunesmithsBlessing() {
        // 5% chance for weapons to spark with magic
        this.runesmithsBlessingActive = true;
    }

    applyDeepminersStamina() {
        // Fast HP regen when under half health
        const deltaTime = this._deltaTime || 0.016;
        if (this.hp < this.maxHp * 0.5) {
            const hpBefore = this.hp;
            this.hp = Math.min(this.maxHp, this.hp + 1 * deltaTime);
            if (this.hp > hpBefore) {
                this.triggerAleFueledResilience();
            }
        }
    }

    applyMountainsEndurance() {
        // Shield when damaging enemies
        this.mountainsEnduranceActive = true;
    }

    applyBloodRage() {
        // 20% damage increase when health drops below 50%
        if (this.hp < this.maxHp * 0.5) {
            this.bloodRageBonus = 0.2;
        } else {
            this.bloodRageBonus = 0;
        }
    }

    applyBerserkersEndurance() {
        // Heal after taking 3 hits
        if (this.berserkerHits >= 3) {
            const hpBefore = this.hp;
            this.hp = Math.min(this.maxHp, this.hp + 10);
            if (this.hp > hpBefore) {
                this.triggerAleFueledResilience();
            }
            this.berserkerHits = 0;
        }
    }

    applyWarCry() {
        // Stun nearby enemies on crit
        this.warCryActive = true;
    }

    applySavageMomentum() {
        // Consecutive attacks get faster and stronger
        this.savageMomentumActive = true;
    }

    applyBonebreaker() {
        // Attacks ignore 2 points of armor
        this.bonebreakerBonus = 2;
    }

    applyHuntersInstinct() {
        // Move faster when chasing low health enemies
        this.huntersInstinctActive = true;
    }

    applyRagingSpirit() {
        // Final attack before falling
        this.ragingSpiritActive = true;
    }

    update(balls, canvasWidth, canvasHeight, deltaTime = 0.016) {
        // Store deltaTime for use in passive skills
        this._deltaTime = deltaTime;

        // Apply passive skills
        this.applyPassiveSkills();

        // Update Spirit Bond (Passive)
        this.updateSpiritBond(deltaTime, canvasWidth, canvasHeight);

        // Update cooldowns with passive skill bonuses
        const cooldownReduction = this.getCooldownReductionMultiplier();

        // Battle Cry and Unstoppable Rage reduce basic attack cooldown (percentage multipliers)
        let basicAttackCooldownReduction = cooldownReduction;
        if (this.battleCryActive && this.battleCryCooldownReduction) {
            basicAttackCooldownReduction *= this.battleCryCooldownReduction; // 25% faster (1.25 multiplier)
        }
        if (this.unstoppableRageActive && this.unstoppableRageCooldownReduction) {
            basicAttackCooldownReduction += this.unstoppableRageCooldownReduction; // Still flat addition for Unstoppable Rage
        }

        // Unstoppable Strength increases basic attack speed by 25% (25% faster cooldown reduction)
        if (this.unstoppableStrengthActive) {
            basicAttackCooldownReduction *= 1.25;
        }

        // Note: Cooldown reduction is now applied when SETTING cooldowns, not when ticking
        // This prevents double reduction and makes the cooldown value itself show the reduced time
        this.basicAttackCooldown = Math.max(0, this.basicAttackCooldown - deltaTime * basicAttackCooldownReduction);
        this.activeSkillCooldown = Math.max(0, this.activeSkillCooldown - deltaTime);
        this.ultimateCooldown = Math.max(0, this.ultimateCooldown - deltaTime);

        // AI behavior
        this.updateAI(balls);

        // Check for Dread Aura wave hits
        if (window.gameInstance && window.gameInstance.visualEffects) {
            window.gameInstance.visualEffects.forEach(effect => {
                if (effect.type === 'dreadAuraWave' && effect.data && effect.data.caster && effect.data.balls && !effect.data.hasHitCheck) {
                    // Calculate current wave radius based on progress
                    const progress = effect.duration > 0 ? 1 - (effect.duration / effect.maxDuration) : 1;
                    const startRadius = effect.data.startRadius || 0;
                    const endRadius = effect.data.endRadius || 160;
                    const currentRadius = startRadius + (endRadius - startRadius) * progress;

                    // Check if any enemies are hit by the wave
                    effect.data.balls.forEach(ball => {
                        if (ball.id !== effect.data.caster.id && !ball.dreadAuraPulled) {
                            const distance = Math.sqrt((ball.x - effect.x) ** 2 + (ball.y - effect.y) ** 2);
                            // Check if enemy is on the wave (within a small range of the current radius)
                            const waveThickness = 15; // Thickness of the wave ring
                            if (distance >= currentRadius - waveThickness && distance <= currentRadius + waveThickness) {
                                // Enemy hit by wave - mark as pulled (taunt effect)
                                if (!ball.dreadAuraPulled) {
                                    ball.dreadAuraPulled = true;
                                    ball.dreadAuraPullTarget = effect.data.caster; // Pull toward the caster
                                    ball.dreadAuraPullDuration = 0.7; // Pull for 0.7 seconds
                                    // Damage is handled in createDreadAuraEffect, not here
                                }
                            }
                        }
                    });

                    // Mark as checked (only check once per frame)
                    effect.data.hasHitCheck = true;
                } else if (effect.type === 'dreadAuraWave' && effect.data) {
                    // Reset hit check flag for next frame
                    effect.data.hasHitCheck = false;
                }

                // Check for Unbreakable Bastion wave hits
                if (effect.type === 'unbreakableBastionWave' && effect.data && effect.data.caster && !effect.data.hasHitCheck) {
                    // Update balls reference to current balls array
                    effect.data.balls = balls;

                    // Calculate current wave radius based on progress
                    const progress = effect.duration > 0 ? 1 - (effect.duration / effect.maxDuration) : 1;
                    const maxRadius = effect.data.radius || 150;
                    const currentRadius = maxRadius * progress;

                    // Check if any enemies are hit by the wave
                    balls.forEach(ball => {
                        if (ball.id !== effect.data.caster.id && !effect.data.hitEnemies.has(ball.id)) {
                            const distance = Math.sqrt((ball.x - effect.x) ** 2 + (ball.y - effect.y) ** 2);
                            // Check if enemy is on the wave (within a small range of the current radius)
                            const waveThickness = 15; // Thickness of the wave ring
                            if (distance >= currentRadius - waveThickness && distance <= currentRadius + waveThickness) {
                                // Enemy hit by wave - apply effects
                                effect.data.hitEnemies.add(ball.id);

                                // Deal damage
                                effect.data.caster.dealDamage(ball, 5, { skillName: 'unbreakableBastion', skillType: 'ultimate' });

                                // Apply taunt (1.3 seconds)
                                ball.applyTaunt(effect.data.caster, 1.3);

                                // Apply shield to caster (only once, when first enemy is hit)
                                if (effect.data.hitEnemies.size === 1) {
                                    const caster = effect.data.caster;
                                    caster.unbreakableBastionShieldValue = 250;
                                    caster.unbreakableBastionShieldMax = 250;
                                    caster.shield = (caster.shield || 0) + 250;

                                    // Create animation effect on caster
                                    if (window.gameInstance) {
                                        window.gameInstance.createVisualEffect(
                                            caster.x,
                                            caster.y,
                                            'unbreakableBastion',
                                            1.3,
                                            {
                                                size: caster.radius * 2,
                                                followTarget: caster
                                            }
                                        );
                                    }
                                }
                            }
                        }
                    });

                    // Mark as checked (only check once per frame)
                    effect.data.hasHitCheck = true;
                } else if (effect.type === 'unbreakableBastionWave' && effect.data) {
                    // Reset hit check flag for next frame
                    effect.data.hasHitCheck = false;
                }
            });
        }

        // Apply Dread Aura pull effect (enemies pulled toward caster at speed 3)
        if (this.dreadAuraPulled && this.dreadAuraPullTarget && this.dreadAuraPullDuration > 0) {
            // Update pull duration
            this.dreadAuraPullDuration -= deltaTime;

            // Check if pull target still exists and is alive
            if (this.dreadAuraPullTarget.hp <= 0 || this.dreadAuraPullDuration <= 0) {
                // Stop pulling - set random direction
                this.dreadAuraPulled = false;
                const randomAngle = Math.random() * Math.PI * 2;
                const randomSpeed = 3 + Math.random() * 2; // Speed between 3-5
                this.vx = Math.cos(randomAngle) * randomSpeed;
                this.vy = Math.sin(randomAngle) * randomSpeed;
                this.dreadAuraPullTarget = null;
                this.dreadAuraPullDuration = 0;
            } else {
                // Move directly toward pull target at speed 3 (like taunt)
                // Only if not stunned, rooted, or in other special states
                if (!this.stunDuration && !this.rooted && !this.grappleSlamActive && !this.unbreakableBastionActive && !this.headbuttActive) {
                    const dx = this.dreadAuraPullTarget.x - this.x;
                    const dy = this.dreadAuraPullTarget.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy) || 1;

                    const pullSpeed = 3;
                    this.vx = (dx / distance) * pullSpeed;
                    this.vy = (dy / distance) * pullSpeed;
                }

                // Create purple trail particles while being pulled
                if (window.gameInstance) {
                    if (!this.dreadAuraTrailTimer) {
                        this.dreadAuraTrailTimer = 0;
                    }
                    this.dreadAuraTrailTimer += deltaTime;
                    if (this.dreadAuraTrailTimer >= 0.05) { // Every 50ms
                        this.dreadAuraTrailTimer = 0;
                        // Create a purple particle behind the ball
                        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
                        if (speed > 0) {
                            const angle = Math.atan2(-this.vy, -this.vx); // Opposite direction of movement
                            const offsetDistance = this.radius + 5;
                            const particleX = this.x + Math.cos(angle) * offsetDistance;
                            const particleY = this.y + Math.sin(angle) * offsetDistance;

                            // Create a purple light effect that fades out
                            window.gameInstance.createVisualEffect(
                                particleX, particleY, 'light', 0.4, // 0.4 second duration
                                {
                                    color: '#8B008B', // Purple color
                                    size: 6
                                }
                            );
                        }
                    }
                }
            }
        } else {
            this.dreadAuraTrailTimer = 0;
        }

        // Apply speed bonuses
        let speedMultiplier = 1;
        if (this.speedBonus) speedMultiplier *= this.speedBonus;
        if (this.naturesWhisperActive) speedMultiplier *= 1.2;
        if (this.huntersInstinctActive && this.aiTarget && this.aiTarget.hp < this.aiTarget.maxHp * 0.3) {
            speedMultiplier *= 1.3;
        }

        // Apply slow effect (reduces speed to 10% of current speed)
        if (this.slowEffect < 1) {
            speedMultiplier *= this.slowEffect;
        }

        // Handle Shield Bash rush
        if (this.shieldBashActive) {
            this.shieldBashDuration -= deltaTime;

            // Only move if not CC'd
            if (!this.stunDuration && !this.feared && !this.rooted) {
                // Rush toward target
                this.x += this.shieldBashVx;
                this.y += this.shieldBashVy;
            }

            // Check if we hit the target (remains active even if CC'd - enemy can collide with us)
            if (this.shieldBashTarget) {
                const distance = Math.sqrt((this.shieldBashTarget.x - this.x) ** 2 + (this.shieldBashTarget.y - this.y) ** 2);
                if (distance < this.radius + this.shieldBashTarget.radius) {
                    // Hit target - deal damage and stun
                    // Play collision sound
                    if (window.gameInstance) {
                        window.gameInstance.playSound('Headbutt_Collision');
                    }

                    this.dealDamage(this.shieldBashTarget, this.shieldBashDamage);
                    if (!this.shieldBashTarget.checkCCDodge()) {
                        const stunDuration = this.shieldBashTarget.applyCCDurationReduction(0.8);
                        this.shieldBashTarget.stunDuration = stunDuration;
                    }

                    // Grant +3 defense for 3 seconds
                    this.shieldBashDefenseBonus = 3;
                    this.shieldBashDefenseDuration = 3.0;

                    // End shield bash
                    this.shieldBashActive = false;
                    this.shieldBashTarget = null;
                }
            }

            // End shield bash if duration is over
            if (this.shieldBashDuration <= 0) {
                this.shieldBashActive = false;
                this.shieldBashTarget = null;
            }
        } else if (this.headbuttActive) {
            this.updateHeadbutt(balls);
        } else if (this.earthshatterLeapActive) {
            // Handle Earthshatter leap
            this.earthshatterLeapProgress += deltaTime / this.earthshatterLeapDuration;

            if (this.earthshatterLeapProgress >= 1) {
                // Leap completed
                this.x = this.earthshatterLeapEndX;
                this.y = this.earthshatterLeapEndY;
                this.earthshatterLeapActive = false;
                this.radius = 20; // Reset radius to normal

                // Create earthshatter effect on enemy
                this.createEarthshatterEffect(this.earthshatterTarget);

                // Deal damage and stun
                this.dealDamage(this.earthshatterTarget, 12, { skillName: 'earthshatter', skillType: 'ultimate' });
                if (!this.earthshatterTarget.checkCCDodge()) {
                    const stunDuration = this.earthshatterTarget.applyCCDurationReduction(1.5);
                    this.earthshatterTarget.stunDuration = stunDuration;
                }
            } else {
                // Interpolate position with size scaling
                const t = this.earthshatterLeapProgress;
                const smoothT = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; // Smooth curve

                this.x = this.earthshatterLeapStartX + (this.earthshatterLeapEndX - this.earthshatterLeapStartX) * smoothT;
                this.y = this.earthshatterLeapStartY + (this.earthshatterLeapEndY - this.earthshatterLeapStartY) * smoothT;

                // Size scaling: gets bigger, biggest at middle, then smaller
                const sizeMultiplier = 1 + Math.sin(t * Math.PI) * 0.5; // 1.0 to 1.5 to 1.0
                this.radius = 20 * sizeMultiplier;
            }
        } else if (!this.grappleSlamActive && !this.rooted && this.stunDuration <= 0 && !this.unbreakableBastionActive && !this.headbuttActive) {
            // Normal movement (skip if grapple slam is active, rooted, or stunned)
            this.x += this.vx * speedMultiplier;
            this.y += this.vy * speedMultiplier;
        }

        // Bounce off walls (skip if rooted or stunned)
        let bouncedX = false;
        let bouncedY = false;
        if (!this.rooted && this.stunDuration <= 0 && !this.unbreakableBastionActive && !this.headbuttActive) {
            if (this.x - this.radius < 0 || this.x + this.radius > canvasWidth) {
                this.vx = -this.vx;
                this.x = Math.max(this.radius, Math.min(canvasWidth - this.radius, this.x));
                bouncedX = true;
            }
            if (this.y - this.radius < 0 || this.y + this.radius > canvasHeight) {
                this.vy = -this.vy;
                this.y = Math.max(this.radius, Math.min(canvasHeight - this.radius, this.y));
                bouncedY = true;
            }
        }

        // If this ball bounced, make any enemies being pulled by it also bounce
        if ((bouncedX || bouncedY) && balls) {
            balls.forEach(ball => {
                if (ball.dreadAuraPulled && ball.dreadAuraPullTarget === this) {
                    // Make pulled enemy bounce in the same direction
                    if (bouncedX) {
                        ball.vx = -ball.vx;
                        ball.x = Math.max(ball.radius, Math.min(canvasWidth - ball.radius, ball.x));
                    }
                    if (bouncedY) {
                        ball.vy = -ball.vy;
                        ball.y = Math.max(ball.radius, Math.min(canvasHeight - ball.radius, ball.y));
                    }
                }
            });
        }

        if (this.unbreakableBastionActive) {
            if (!this.unbreakableBastionPosition) {
                this.unbreakableBastionPosition = { x: this.x, y: this.y };
            } else {
                this.x = this.unbreakableBastionPosition.x;
                this.y = this.unbreakableBastionPosition.y;
            }
            this.vx = 0;
            this.vy = 0;
        }

        // Update effects
        this.updateEffects(deltaTime);

        // Use skills automatically
        this.useSkills(balls);

        // Apply hellfire aura damage to nearby enemies
        if (this.hellfireAuraActive) {
            balls.forEach(ball => {
                if (ball.id !== this.id) {
                    const distance = Math.sqrt((ball.x - this.x) ** 2 + (ball.y - this.y) ** 2);
                    if (distance < 60) {
                        ball.hp = Math.max(0, ball.hp - 0.5 * 0.016); // 0.5 damage per second
                    }
                }
            });
        }

        // Update weapon spinning for melee weapons
        this.updateWeaponSpinning(balls);

        // Check for ball-to-ball collisions
        this.checkBallCollisions(balls);
    }

    updateAI(balls) {
        // Find closest enemy for targeting (but don't move towards them)
        const enemies = balls.filter(ball => ball.id !== this.id);
        if (enemies.length === 0) return;

        let tauntTarget = null;
        if (this.tauntDuration > 0 && this.tauntTargetId) {
            tauntTarget = enemies.find(enemy => enemy.id === this.tauntTargetId) || null;
            if (!tauntTarget) {
                this.tauntTargetId = null;
                this.tauntDuration = 0;
            }
        }

        if (tauntTarget) {
            this.aiTarget = tauntTarget;
        } else {
            const closestEnemy = enemies.reduce((closest, enemy) => {
                const dist = Math.sqrt((enemy.x - this.x) ** 2 + (enemy.y - this.y) ** 2);
                const closestDist = Math.sqrt((closest.x - this.x) ** 2 + (closest.y - this.y) ** 2);
                return dist < closestDist ? enemy : closest;
            });

            this.aiTarget = closestEnemy;
        }

        // No friction - balls keep moving forever
        // No random direction changes - only bouncing changes direction

        // Limit speed to maximum of 7 and minimum of 3
        const maxSpeed = 7;
        const minSpeed = 3;
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);

        if (speed > maxSpeed) {
            this.vx = (this.vx / speed) * maxSpeed;
            this.vy = (this.vy / speed) * maxSpeed;
        } else if (speed < minSpeed && speed > 0) {
            // Only apply minimum speed if ball is moving (speed > 0)
            this.vx = (this.vx / speed) * minSpeed;
            this.vy = (this.vy / speed) * minSpeed;
        }

        if (tauntTarget) {
            const dx = tauntTarget.x - this.x;
            const dy = tauntTarget.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy) || 1;
            const chaseSpeed = 5;
            this.vx = (dx / distance) * chaseSpeed;
            this.vy = (dy / distance) * chaseSpeed;
        }
    }

    updateWeaponSpinning(balls) {
        // Handle melee weapons and unarmed attacks
        const meleeWeapons = [];
        const unarmedAttacks = ['ironFist', 'flurryOfBlows', 'grappleSlam'];
        const rangedWeapons = ['bow', 'crossbow', 'staff', 'sword', 'dualSword'];

        // Handle ranged weapons (bow, crossbow) - always visible, no spinning
        if (rangedWeapons.includes(this.weapon)) {
            this.updateRangedWeapon(balls);
            return;
        }

        if (!meleeWeapons.includes(this.weapon) && !unarmedAttacks.includes(this.attack)) return;

        // If weapon is off cooldown and not active, create spinning effect
        if (this.basicAttackCooldown <= 0 && !this.weaponActive) {
            this.activateWeapon();
        }

        // If weapon is active, update rotation
        if (this.weaponActive && this.weaponEffect) {
            // Different rotation speeds for different weapon types
            if (this.attack === 'ironFist' || this.attack === 'flurryOfBlows' || this.attack === 'grappleSlam') {
                this.weaponRotation += 0.025; // Half speed for unarmed attacks
            } else {
                this.weaponRotation += 0.05; // Normal speed for melee weapons
            }
            this.updateWeaponEffect();

            // Check for hits
            this.checkWeaponHit(balls);
        }
    }

    updateRangedWeapon(balls) {
        // For ranged weapons (bow, crossbow, staff), always show the weapon and rotate it to face the enemy
        // For sword and dual sword, only show when not on cooldown
        if (!this.weaponActive) {
            if (this.weapon === 'sword' || this.weapon === 'dualSword') {
                // Only activate sword/dual sword if not on cooldown
                if (this.basicAttackCooldown <= 0) {
                    this.activateRangedWeapon();
                }
            } else {
                // Other ranged weapons are always visible
                this.activateRangedWeapon();
            }
        }

        // Update weapon rotation to face the closest enemy
        if (this.weaponActive && this.weaponEffect) {
            const enemies = balls.filter(ball => ball.id !== this.id);
            if (enemies.length > 0) {
                const closestEnemy = enemies.reduce((closest, enemy) => {
                    const dist = Math.sqrt((enemy.x - this.x) ** 2 + (enemy.y - this.y) ** 2);
                    const closestDist = Math.sqrt((closest.x - this.x) ** 2 + (closest.y - this.y) ** 2);
                    return dist < closestDist ? enemy : closest;
                });

                // Calculate angle to enemy
                const dx = closestEnemy.x - this.x;
                const dy = closestEnemy.y - this.y;
                this.weaponRotation = Math.atan2(dy, dx);

                this.updateWeaponEffect();
            }
        }
    }

    activateRangedWeapon() {
        if (!window.gameInstance) return;

        this.weaponActive = true;
        this.weaponRotation = 0; // Will be updated to face enemy

        // Play draw sound for sword and dual sword
        if (this.weapon === 'sword') {
            window.gameInstance.playSound('sword_draw');
        } else if (this.weapon === 'dualSword') {
            window.gameInstance.playSound('dual_sword_draw');
        }

        // Create persistent weapon effect for ranged weapons
        let imageKey = 'bow';
        let weaponSize = this.radius * 0.8 * 1.2; // 1.2x bigger than before

        if (this.weapon === 'crossbow') {
            imageKey = 'crossbow';
            weaponSize *= 1.5; // Crossbow is 1.5x bigger as requested
        } else if (this.weapon === 'staff') {
            imageKey = 'staff';
        } else if (this.weapon === 'sword') {
            imageKey = 'sword';
        } else if (this.weapon === 'dualSword') {
            imageKey = 'sword'; // Use the same sword image
        }

        this.weaponEffect = window.gameInstance.createVisualEffect(
            this.x, this.y, 'weapon', 999, // Very long duration
            {
                size: weaponSize,
                imageKey: imageKey,
                followTarget: this,
                offsetX: 0,
                offsetY: 0,
                weaponType: this.weapon // Add weapon type to distinguish dual sword
            }
        );
    }

    activateWeapon() {
        if (!window.gameInstance) return;

        this.weaponActive = true;
        // Start unarmed attacks from the top of the ball
        if (this.attack === 'ironFist' || this.attack === 'flurryOfBlows' || this.attack === 'grappleSlam') {
            this.weaponRotation = -Math.PI / 2; // Start from top (-90 degrees)
        } else {
            this.weaponRotation = 0; // Normal start for melee weapons
        }

        // Create persistent weapon effect
        let imageKey = 'sword';
        if (this.weapon === 'dualSword') {
            imageKey = 'dualSword';
        } else if (this.attack === 'ironFist' || this.attack === 'flurryOfBlows' || this.attack === 'grappleSlam') {
            imageKey = 'unarmed';
        }

        this.weaponEffect = window.gameInstance.createVisualEffect(
            this.x, this.y, 'weapon', 999, // Very long duration
            {
                size: 25,
                color: '#ff0000',
                imageKey: imageKey,
                followTarget: this,
                rotation: this.weaponRotation
            }
        );
    }

    updateWeaponEffect() {
        if (!this.weaponEffect) return;

        // Update the weapon effect's rotation
        this.weaponEffect.angle = this.weaponRotation;
    }

    checkWeaponHit(balls) {
        if (!this.weaponActive) return;

        // Check if weapon hits any enemy
        balls.forEach(ball => {
            if (ball.id !== this.id) {
                const distance = Math.sqrt((ball.x - this.x) ** 2 + (ball.y - this.y) ** 2);
                if (distance < 50) { // Hit range
                    this.hitWithWeapon(ball);
                }
            }
        });
    }

    hitWithWeapon(target) {
        if (!this.weaponActive) return;

        // Deal damage
        const damage = this.getBasicAttackDamage(target);
        this.dealDamage(target, damage, { skillName: this.attack || 'Basic Attack', skillType: 'basic' });

        // Deactivate weapon and start cooldown
        this.deactivateWeapon();
        this.basicAttackCooldown = 1.2; // 1.2 second cooldown
    }

    deactivateWeapon() {
        this.weaponActive = false;
        if (this.weaponEffect) {
            // Remove the weapon effect
            this.weaponEffect.duration = 0;
            this.weaponEffect = null;
        }
    }

    updateEffects(deltaTime = 0.016) {
        // Update duration-based effects
        if (this.slowDuration) {
            this.slowDuration -= deltaTime;
            if (this.slowDuration <= 0) {
                this.slowEffect = 1;
                this.slowDuration = 0;
            }
        }

        if (this.stunDuration) {
            this.stunDuration -= deltaTime;
            if (this.stunDuration <= 0) {
                this.stunDuration = 0;
            }
        }

        if (this.rootDuration) {
            this.rootDuration -= deltaTime;
            if (this.rootDuration <= 0) {
                this.rooted = false;
                this.rootDuration = 0;
            }
        }

        if (this.burnDuration) {
            this.burnDuration -= deltaTime;
            if (this.burnDuration <= 0) {
                this.burnDamage = 0;
                this.burnDuration = 0;
            } else if (this.burnDamage) {
                this.hp = Math.max(0, this.hp - this.burnDamage * deltaTime);
            }
        }


        // Update buff durations
        if (this.battleCryDuration) {
            this.battleCryDuration -= deltaTime;
            if (this.battleCryDuration <= 0) {
                this.battleCryActive = false;
                this.battleCryDuration = 0;
                this.battleCryCooldownReduction = 0;
                this.battleCryDamageBonus = 0;
                // Set cooldown when the skill ends
                this.activeSkillCooldown = this.applyCooldownReduction(4);
            }
        }

        // Blood Frenzy stacks handled per damage instance

        if (this.feared) {
            this.fearDuration -= deltaTime;
            if (this.fearDuration <= 0) {
                this.feared = false;
                this.fearDuration = 0;
            }
        }

        if (this.tacticalRollDuration) {
            this.tacticalRollDuration -= deltaTime;
            if (this.tacticalRollDuration <= 0) {
                this.speedBonus = 1;
                this.tacticalRollDuration = 0;
            }
        }

        if (this.shieldBashDefenseDuration > 0) {
            this.shieldBashDefenseDuration -= deltaTime;
            if (this.shieldBashDefenseDuration <= 0) {
                this.shieldBashDefenseBonus = 0;
                this.shieldBashDefenseDuration = 0;
            }
        }

        // Battle Focus stacks are consumed per basic attack, not per frame
        // Stack consumption happens in performBasicAttack() method

        if (this.dreadAuraDuration) {
            this.dreadAuraDuration -= deltaTime;
            if (this.dreadAuraDuration <= 0) {
                this.dreadAuraActive = false;
                this.dreadAuraDuration = 0;
            }
        }

        // Ultimate durations
        if (this.unstoppableStrengthActive) {
            this.clearCrowdControlEffects();
            this.unstoppableStrengthDuration -= deltaTime;
            if (this.unstoppableStrengthDuration <= 0) {
                this.finishUnstoppableStrength();
            }
        }

        if (this.unstoppableRageDuration) {
            this.unstoppableRageDuration -= deltaTime;
            if (this.unstoppableRageDuration <= 0) {
                this.unstoppableRageActive = false;
                this.unstoppableRageDuration = 0;
                this.unstoppableRageCooldownReduction = 0;
                this.unstoppableRageDamageBonus = 0;
                // Set cooldown when the skill ends
                this.ultimateCooldown = 12;
            }
        }

        if (this.bastionDuration) {
            this.bastionDuration -= deltaTime;
            if (this.bastionDuration <= 0) {
                this.bastionDuration = 0;
                this.endUnbreakableBastion();
            }
        }

        if (this.tauntDuration) {
            this.tauntDuration -= deltaTime;
            if (this.tauntDuration <= 0) {
                this.tauntDuration = 0;
                this.tauntTargetId = null;
            }
        }

        if (this.spiritOfForestDuration) {
            this.spiritOfForestDuration -= deltaTime;
            if (this.spiritOfForestDuration <= 0) {
                this.speedBonus = 1;
                this.hpRegen = 0;
                this.spiritOfForestDuration = 0;
            }
        }

        // Last Stand duration logic removed - it now only ends when shield breaks

        if (this.demonicAscensionDuration) {
            this.demonicAscensionDuration -= deltaTime;
            if (this.demonicAscensionDuration <= 0) {
                this.damageBonus = 0;
                this.lifesteal = 0;
                this.demonicAscensionDuration = 0;
                // Set cooldown when the skill ends
                this.ultimateCooldown = 12; // 12 second cooldown
            }
        }

        // Apply HP regeneration
        if (this.hpRegen) {
            const hpBefore = this.hp;
            this.hp = Math.min(this.maxHp, this.hp + this.hpRegen * deltaTime);
            if (this.hp > hpBefore) {
                this.triggerAleFueledResilience();
            }

            // Create regeneration effect every second
            if (!this.lastRegenEffect || Date.now() - this.lastRegenEffect > 1000) {
                this.createRegenerationEffect();
                this.lastRegenEffect = Date.now();
            }
        }

        // Update Ale-Fueled Resilience duration
        if (this.aleFueledResilienceDuration > 0) {
            this.aleFueledResilienceDuration -= deltaTime;
            if (this.aleFueledResilienceDuration <= 0) {
                this.aleFueledResilienceDuration = 0;
            }
        }

        // Apply shield absorption
        if (this.shield && this.shield > 0) {
            // Shield absorbs damage first
        }

        // Apply cooldown slow
        if (this.cooldownSlow) {
            this.basicAttackCooldown += 0.016 * this.cooldownSlow;
            this.activeSkillCooldown += 0.016 * this.cooldownSlow;
            this.ultimateCooldown += 0.016 * this.cooldownSlow;
        }
    }

    removeEffect(effect) {
        // Remove effect logic here
    }

    checkBallCollisions(balls) {
        balls.forEach(ball => {
            if (ball.id !== this.id) {
                const distance = Math.sqrt((ball.x - this.x) ** 2 + (ball.y - this.y) ** 2);
                const minDistance = this.radius + ball.radius;

                if (distance < minDistance) {
                    // Check for Hero's Wrath collision
                    if (this.ultimate === 'herosWrath' && this.ultimateCooldown <= 0) {
                        this.triggerHerosWrath(ball);
                    }
                    if (ball.ultimate === 'herosWrath' && ball.ultimateCooldown <= 0) {
                        ball.triggerHerosWrath(this);
                    }

                    // Check for War Stomp collision
                    if (this.skill === 'warStomp' && this.activeSkillCooldown <= 0) {
                        this.createWarStompCollisionEffect(ball);
                    }
                    if (ball.skill === 'warStomp' && ball.activeSkillCooldown <= 0) {
                        ball.createWarStompCollisionEffect(this);
                    }

                    // Check for Hammer of Mountain collision
                    if (this.ultimate === 'hammerOfMountain' && this.ultimateCooldown <= 0) {
                        this.createHammerOfMountainCollisionEffect(ball);
                    }
                    if (ball.ultimate === 'hammerOfMountain' && ball.ultimateCooldown <= 0) {
                        ball.createHammerOfMountainCollisionEffect(this);
                    }

                    // Collision detected - separate balls
                    const overlap = minDistance - distance;
                    const separationX = (this.x - ball.x) / distance * overlap * 0.5;
                    const separationY = (this.y - ball.y) / distance * overlap * 0.5;

                    this.x += separationX;
                    this.y += separationY;
                    ball.x -= separationX;
                    ball.y -= separationY;

                    // Bounce effect
                    const angle = Math.atan2(ball.y - this.y, ball.x - this.x);
                    const speed1 = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
                    const speed2 = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);

                    // Simple elastic collision
                    this.vx = -Math.cos(angle) * speed1 * 0.8;
                    this.vy = -Math.sin(angle) * speed1 * 0.8;
                    ball.vx = Math.cos(angle) * speed2 * 0.8;
                    ball.vy = Math.sin(angle) * speed2 * 0.8;
                }
            }
        });
    }

    useSkills(balls) {
        // Skills can be used even when rooted

        // Use basic attack (skip if stunned)
        if (this.basicAttackCooldown <= 0 && this.aiTarget && this.stunDuration <= 0 && !this.headbuttActive && !this.feared) {
            const distance = Math.sqrt((this.aiTarget.x - this.x) ** 2 + (this.aiTarget.y - this.y) ** 2);
            const rangedWeapons = ['bow', 'crossbow', 'staff'];

            // For ranged weapons, attack from any distance
            // For melee weapons, only attack when close
            if (rangedWeapons.includes(this.weapon) || distance < 50) {
                this.useBasicAttack(this.aiTarget);
            }
        }

        // Use active skill (skip if stunned)
        if (this.activeSkillCooldown <= 0 && this.aiTarget && this.stunDuration <= 0 && !this.headbuttActive && !this.feared) {
            // Don't use Execution Strike, Battle Focus, or Battle Cry if they already have stacks/are active
            if ((this.skill === 'executionStrike' && this.executionStrikeStacks > 0) ||
                (this.skill === 'battleFocus' && this.battleFocusStacks > 0) ||
                (this.skill === 'battleCry' && this.battleCryActive)) {
                // Skip using skill if already active
            } else {
                this.useActiveSkill(this.aiTarget, balls);
            }
        }

        // Use ultimate (skip if stunned)
        if (this.ultimateCooldown <= 0 && this.aiTarget && this.stunDuration <= 0 && !this.headbuttActive && !this.feared) {
            const distance = Math.sqrt((this.aiTarget.x - this.x) ** 2 + (this.aiTarget.y - this.y) ** 2);
            if (distance < 150) {
                this.useUltimate(this.aiTarget, balls);
            }
        }

        if (this.ultimate === 'unstoppableStrength' &&
            this.ultimateCooldown <= 0 &&
            !this.unstoppableStrengthActive &&
            !this.headbuttActive) {
            const fallbackTarget = this.aiTarget || balls.find(ball => ball.id !== this.id) || this;
            this.useUltimate(fallbackTarget, balls);
        }
    }

    useBasicAttack(target) {
        if (this.stunDuration > 0 || this.headbuttActive) {
            return;
        }

        // Check for Shadow Puppeteer cancellation (5% chance)
        if (target && this.checkShadowPuppeteerCancel && this.checkShadowPuppeteerCancel(target)) {
            // Set cooldown even when cancelled (for all weapons including sword/dual sword)
            this.basicAttackCooldown = 1.2; // 1.2 second cooldown
            return; // Move cancelled
        }

        // Set cooldown for all weapons
        // Focused Beam has a longer cooldown
        if (this.attack === 'focusedBeam') {
            this.basicAttackCooldown = 3; // 3 second cooldown for Focused Beam
        } else {
            this.basicAttackCooldown = 1.2; // 1.2 second cooldown
        }

        // Check if this is a ranged weapon
        const rangedWeapons = ['bow', 'crossbow', 'staff', 'sword', 'dualSword'];
        if (rangedWeapons.includes(this.weapon)) {
            const damage = this.getBasicAttackDamage(target);
            // Special handling for volley attack
            if (this.attack === 'volley') {
                this.createVolley(target, damage);
            } else if (this.attack === 'scatterShot') {
                this.createScatterShot(target, damage);
            } else {
                this.createProjectile(target, damage);
            }
        } else {
            // Melee attack - handled by weapon spinning system
            // The weapon spinning system will handle damage when weapons hit

            // Add visual effects for specific Human attacks
            if (this.attack === 'flurryOfBlows') {
                this.createFlurryOfBlowsEffect(target);
            } else if (this.attack === 'grappleSlam') {
                this.createGrappleSlamEffect(target);
            }
            // Iron Fist effect is handled by weapon spinning system
        }

        // --- CONSUME STACKS AT THE END ---
        // Consume Execution Strike stack if active
        if (this.executionStrikeStacks > 0) {
            this.executionStrikeStacks--;

            // If this was the last stack, put Execution Strike on cooldown
            if (this.executionStrikeStacks <= 0) {
                this.activeSkillCooldown = 4; // 4 second cooldown
                // Remove the visual effect
                if (window.gameInstance) {
                    window.gameInstance.visualEffects = window.gameInstance.visualEffects.filter(effect =>
                        !(effect.type === 'image' && effect.imageKey === 'executionStrike' && effect.followTarget === this)
                    );
                }
            }
        }

        // Consume Battle Focus stack if active
        if (this.battleFocusStacks > 0) {
            this.battleFocusStacks--;

            // If this was the last stack, put Battle Focus on cooldown
            if (this.battleFocusStacks <= 0) {
                this.activeSkillCooldown = 4; // 4 second cooldown
                // Remove the visual effect
                if (window.gameInstance) {
                    window.gameInstance.visualEffects = window.gameInstance.visualEffects.filter(effect =>
                        !(effect.type === 'image' && effect.imageKey === 'battleFocus' && effect.followTarget === this)
                    );
                }
            }
        }
    }

    createMeleeAttackEffect(target) {
        if (!window.gameInstance) return;

        const angle = Math.atan2(target.y - this.y, target.x - this.x);

        // Create weapon-specific slash effect
        let imageKey = 'sword'; // default
        if (this.weapon === 'dualSword') {
            imageKey = 'dualSword';
        }

        // Create multiple slash effects around the ball to simulate spinning/swinging
        for (let i = 0; i < 3; i++) {
            const slashAngle = angle + (i - 1) * 0.8; // Spread around the target direction
            const offsetX = Math.cos(slashAngle) * 20; // Distance from ball center
            const offsetY = Math.sin(slashAngle) * 20;

            window.gameInstance.createVisualEffect(
                this.x + offsetX, this.y + offsetY, 'slash', 0.4,
                { angle: slashAngle, size: 25, color: '#ff0000', imageKey: imageKey }
            );
        }

        // Create impact effect on target
        window.gameInstance.createVisualEffect(
            target.x, target.y, 'explosion', 0.3,
            { size: 15, color: '#ff4400' }
        );
    }

    createAxeThrowEffect(target) {
        if (!window.gameInstance) return;

        // Create spinning axe effect with image
        window.gameInstance.createVisualEffect(
            this.x, this.y, 'slash', 0.8,
            { angle: Math.atan2(target.y - this.y, target.x - this.x), size: 40, color: '#8B4513', imageKey: 'axeThrow' }
        );

        // Create impact effect
        window.gameInstance.createVisualEffect(
            target.x, target.y, 'explosion', 0.4,
            { size: 20, color: '#ff6600' }
        );
    }

    createFrenziedSlashEffect(balls) {
        if (!window.gameInstance) return;

        // Create multiple slash effects around the ball
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            window.gameInstance.createVisualEffect(
                this.x, this.y, 'slash', 0.6,
                { angle: angle, size: 35, color: '#ff0000' }
            );
        }
    }

    createWarStompEffect(balls) {
        if (!window.gameInstance) return;

        // Create ground impact effect with image
        window.gameInstance.createVisualEffect(
            this.x, this.y, 'earth', 0.8,
            { size: 60, color: '#8B4513', imageKey: 'warStomp' }
        );

        // Create shockwave
        window.gameInstance.createVisualEffect(
            this.x, this.y, 'explosion', 0.5,
            { size: 80, color: '#ffaa00' }
        );
    }

    createWarStompCollisionEffect(target) {
        if (!window.gameInstance) return;

        // Play War Stomp sound on collision
        window.gameInstance.playSound('warStomp');

        // Deal 8 damage once
        this.dealDamage(target, 8);

        // Stun the target for 0.8 seconds (lock in place, no abilities)
        if (!target.checkCCDodge()) {
            const stunDuration = target.applyCCDurationReduction(0.8);
            target.stunDuration = stunDuration;
        }

        // Create war stomp animation effect on the target
        window.gameInstance.createVisualEffect(
            target.x, target.y, 'warStomp', 1.0, // 1 second duration
            {
                size: target.radius * 2, // Same size as target ball
                followTarget: target
                // No imageKey - this ensures renderWarStomp is called instead of renderImage
            }
        );

        // Put war stomp on cooldown
        this.activeSkillCooldown = 4; // 4 second cooldown
    }

    createHammerOfMountainCollisionEffect(target) {
        if (!window.gameInstance) return;

        // Play Hammer of Mountain sound on collision
        window.gameInstance.playSound('hammerOfMountain');

        // Deal 14 damage
        this.dealDamage(target, 14, { skillName: 'hammerOfMountain', skillType: 'ultimate' });

        // Stun the target for 1.2 seconds
        if (!target.checkCCDodge()) {
            const stunDuration = target.applyCCDurationReduction(1.2);
            target.stunDuration = Math.max(target.stunDuration || 0, stunDuration);
        }

        // Create hammer of mountain animation effect on the target
        window.gameInstance.createVisualEffect(
            target.x, target.y, 'hammerOfMountain', 1.0,
            {
                size: target.radius * 4,
                followTarget: target,
                dropDistance: target.radius * 3
            }
        );

        // Put hammer of mountain on cooldown
        this.ultimateCooldown = this.applyCooldownReduction(12); // 12 second cooldown
    }

    createBattleCryEffect() {
        if (!window.gameInstance) return;

        // Create aura effect
        window.gameInstance.createVisualEffect(
            this.x, this.y, 'aura', 1.5,
            { size: 50, color: '#ff0000' }
        );
    }

    createHammerStrikeEffect(target) {
        if (!window.gameInstance) return;

        // Apply 1 second stun to the target
        if (!target.checkCCDodge()) {
            const stunDuration = target.applyCCDurationReduction(1.0);
            target.stunDuration = Math.max(target.stunDuration || 0, stunDuration);
        }

        // Play hammer strike animation on the target
        window.gameInstance.createVisualEffect(
            target.x,
            target.y,
            'hammerStrike',
            1.5,
            {
                size: target.radius * 4,
                followTarget: target,
                imageKey: 'hammerStrikeFrame1',
                dropDistance: target.radius * 2
            }
        );
    }

    createStoneTossEffect(target) {
        if (!window.gameInstance || !target) return;

        // Play stone toss impact animation over the target
        window.gameInstance.createVisualEffect(
            target.x,
            target.y,
            'stoneToss',
            1.5,
            {
                size: target.radius * 4,
                followTarget: target,
                imageKey: 'stoneTossFrame1',
                dropDistance: target.radius * 2
            }
        );
    }

    createElementalBurstWaveEffect(target) {
        if (!window.gameInstance || !target) return;

        // Create fast expanding orange circle wave (empty inside) with radius 60
        window.gameInstance.createVisualEffect(
            target.x,
            target.y,
            'elementalBurstWave',
            0.5, // Fast expansion - 0.5 seconds
            {
                startRadius: 0,
                endRadius: 60,
                color: '#FF8C00', // Orange color
                lineWidth: 6
            }
        );
    }

    createHammerOfMountainEffect(target) {
        if (!window.gameInstance || !target) return;

        window.gameInstance.createVisualEffect(
            target.x,
            target.y,
            'hammerOfMountain',
            1.0,
            {
                size: target.radius * 4,
                followTarget: target,
                dropDistance: target.radius * 3
            }
        );
    }

    createFortifyEffect() {
        // Visual handled directly in Ball.render to keep Fortify indicator centered on the caster
    }

    consumeFortifyCharge() {
        if (!this.fortifyActive || this.fortifyStacks <= 0) return;

        // Check if enough time has passed since last stack consumption (prevent sound spam)
        const now = Date.now();
        const canPlaySound = (now - this.lastFortifyStackConsumed) > 100; // 100ms cooldown

        // Consume 1 stack
        this.fortifyStacks--;

        // Play Fortify sound only once per stack consumption (with cooldown)
        if (window.gameInstance && canPlaySound) {
            window.gameInstance.playSound('fortify');
            this.lastFortifyStackConsumed = now;
        }

        // If all stacks are consumed, deactivate and set cooldown
        if (this.fortifyStacks <= 0) {
            this.fortifyActive = false;
            this.fortifyStacks = 0;
            this.activeSkillCooldown = this.applyCooldownReduction(this.fortifyCooldownDuration);
        }
    }

    endUnbreakableBastion() {
        if (!this.unbreakableBastionActive) return;
        this.unbreakableBastionActive = false;
        this.tauntEnemies = false;
        this.bastionDuration = 0;
        this.unbreakableBastionPosition = null;
        if (this.unbreakableBastionStoredVelocity) {
            this.vx = this.unbreakableBastionStoredVelocity.vx;
            this.vy = this.unbreakableBastionStoredVelocity.vy;
            this.unbreakableBastionStoredVelocity = null;
        }
        if (this.unbreakableBastionShieldValue > 0) {
            const removableShield = Math.min(this.shield || 0, this.unbreakableBastionShieldValue);
            this.shield = Math.max(0, (this.shield || 0) - removableShield);
            this.unbreakableBastionShieldValue = 0;
            this.unbreakableBastionShieldMax = 0;
        }
        if (this.bastionDuration <= 0) {
            this.ultimateCooldown = 12;
        }
    }

    applyTaunt(source, duration = 3) {
        if (!source) return;
        this.tauntTargetId = source.id;
        this.tauntDuration = duration;
    }

    applyFear(duration = 2) {
        if (this.immuneToCC) return;
        if (this.checkCCDodge()) return; // CC dodged, don't apply fear
        this.feared = true;
        const reducedDuration = this.applyCCDurationReduction(duration);
        this.fearDuration = Math.max(this.fearDuration, reducedDuration);
    }

    clearCrowdControlEffects() {
        this.stunDuration = 0;
        this.feared = false;
        this.fearDuration = 0;
        this.rooted = false;
        this.rootDuration = 0;
    }

    startBattleRoarAnimation() {
        const now = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
        this.battleRoarAnimationStart = now;
    }

    applyBattleRoarBuff(stacks = 3) {
        this.battleRoarBonusStacks = stacks;
        this.startBattleRoarAnimation();
    }

    applyBattleRoarDebuff(stacks = 3) {
        this.battleRoarDebuffStacks = stacks;
    }

    startUnstoppableStrength() {
        if (this.unstoppableStrengthActive) return;
        this.unstoppableStrengthActive = true;
        this.unstoppableStrengthDuration = 3;
        this.unstoppableStrengthAnimationStart = null;
        this.immuneToCC = true;
        this.clearCrowdControlEffects();
    }

    finishUnstoppableStrength() {
        this.unstoppableStrengthActive = false;
        this.unstoppableStrengthDuration = 0;
        this.unstoppableStrengthAnimationStart = null;
        this.immuneToCC = false;
        this.ultimateCooldown = 12;
    }

    activateRuneCharge() {
        if (this.runeChargeActive || this.runeChargeStacks > 0) return;
        if (this.activeSkillCooldown > 0) return;

        // Play sound only once when skill is activated
        if (window.gameInstance) {
            window.gameInstance.playSound('runeCharge');
        }

        this.runeChargeActive = true;
        this.runeChargeStacks = 3;
        this.startRuneChargeAnimation();
    }

    startRuneChargeAnimation() {
        const now = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
        this.runeChargeAnimationStart = now;
    }

    consumeRuneChargeStack() {
        if (!this.runeChargeActive || this.runeChargeStacks <= 0) return;
        this.runeChargeStacks--;
        if (this.runeChargeStacks <= 0) {
            this.finishRuneCharge();
        }
    }

    finishRuneCharge() {
        this.runeChargeActive = false;
        this.runeChargeStacks = 0;
        this.runeChargeAnimationStart = null;
        this.activeSkillCooldown = this.applyCooldownReduction(this.runeChargeCooldownDuration);
    }

    createArrowStormProjectile(target) {
        if (!window.gameInstance) return;

        // Calculate direction to target
        const dx = target.x - this.x;
        const dy = target.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance === 0) return;

        // Range is 100 pixels, travel time is 0.7 seconds
        // Speed = 100 / 0.7 = ~142.86 pixels per second, or ~2.38 pixels per frame at 60fps
        const range = 100;
        const travelTime = 0.7;
        const speed = range / travelTime / 60; // pixels per frame

        const vx = (dx / distance) * speed;
        const vy = (dy / distance) * speed;

        // Create projectile
        const projectile = new Projectile(
            this.x, this.y, vx, vy, 10, 'arrowStormProjectile', this.id, target.id,
            {
                skillName: 'arrowStorm',
                skillType: 'active',
                collisionRadius: this.radius
            }
        );

        // Set lifetime to 0.7 seconds (projectile disappears after traveling its range)
        projectile.lifetime = travelTime;
        projectile.isArrowStorm = true;
        projectile.arrowStormStartTime = Date.now();
        projectile.arrowStormDuration = travelTime * 1000; // in milliseconds
        projectile.piercing = true; // Don't disappear on hit, keep moving
        projectile.arrowStormHitEnemies = new Set(); // Track enemies already hit (only damage once)

        window.gameInstance.projectiles.push(projectile);
    }

    createNaturesGraspEffect(target) {
        if (!window.gameInstance) return;

        // Create Nature's Grasp animation effect on the target
        window.gameInstance.createVisualEffect(
            target.x, target.y, 'naturesGrasp', 2.0,
            { size: target.radius, followTarget: target, imageKey: 'naturesGrasp' }
        );
    }

    createShadowstepEffect(startX, startY, endX, endY) {
        if (!window.gameInstance) return;

        // Create shadowstep animation effect that moves from start to end
        window.gameInstance.createVisualEffect(
            startX, startY, 'shadowstep', 1.0, // 1 second animation
            {
                size: this.radius,
                startX: startX,
                startY: startY,
                endX: endX,
                endY: endY
            }
        );
    }

    createSylvanMarkEffect(target) {
        if (!window.gameInstance) return;

        // Create Sylvan Mark animation effect on the target
        window.gameInstance.createVisualEffect(
            target.x, target.y, 'sylvanMark', 1.0,
            { size: target.radius, followTarget: target }
        );
    }

    createRainOfStarsEffect(target) {
        if (!window.gameInstance) return;

        // Create Rain of Stars animation effect on the target
        window.gameInstance.createVisualEffect(
            target.x, target.y, 'rainOfStars', 1.5,
            { size: target.radius, followTarget: target }
        );
    }

    createRainOfStarsZones(balls) {
        if (!window.gameInstance) return;

        const canvasWidth = window.gameInstance.canvas.width;
        const canvasHeight = window.gameInstance.canvas.height;
        const caster = this;

        // Create 3 zones at random locations
        for (let i = 0; i < 3; i++) {
            const randomX = Math.random() * (canvasWidth - 100) + 50;
            const randomY = Math.random() * (canvasHeight - 100) + 50;

            // Create tracking set for enemies hit by this zone
            const hitEnemies = new Set();

            // Create visual effect for this zone
            const zoneEffect = window.gameInstance.createVisualEffect(
                randomX, randomY, 'rainOfStarsZone', 1.2, // 1.2 seconds duration
                {
                    size: 60, // Radius of the damage zone
                    hitEnemies: hitEnemies,
                    caster: caster,
                    balls: balls,
                    damage: 12
                }
            );
        }
    }

    createRainOfStarsIndicators(balls) {
        if (!window.gameInstance) return;

        const canvasWidth = window.gameInstance.canvas.width;
        const canvasHeight = window.gameInstance.canvas.height;
        const caster = this;

        // Store positions for later use
        const positions = [];

        // Create 3 indicator circles at random locations
        for (let i = 0; i < 3; i++) {
            const randomX = Math.random() * (canvasWidth - 100) + 50;
            const randomY = Math.random() * (canvasHeight - 100) + 50;
            positions.push({ x: randomX, y: randomY });

            // Create purple circle indicator (Phase 1 - 1 second)
            window.gameInstance.createVisualEffect(
                randomX, randomY, 'rainOfStarsIndicator', 1.0,
                {
                    size: 60, // Radius of the indicator circle
                    color: '#8B008B' // Purple color
                }
            );
        }

        // After 1 second, start the real animations and resume movement
        setTimeout(() => {
            // Resume ball movement
            this.vx = this.rainOfStarsStoredVx || 0;
            this.vy = this.rainOfStarsStoredVy || 0;
            this.rainOfStarsStopped = false;

            // Play sound when real animation starts
            if (window.gameInstance) {
                window.gameInstance.playSound('rainOfStars');
            }

            // Create the actual damage zones at the stored positions
            positions.forEach(pos => {
                const hitEnemies = new Set();
                window.gameInstance.createVisualEffect(
                    pos.x, pos.y, 'rainOfStarsZone', 1.2, // 1.2 seconds duration
                    {
                        size: 60,
                        hitEnemies: hitEnemies,
                        caster: caster,
                        balls: balls,
                        damage: 12
                    }
                );
            });
        }, 1000);
    }

    launchSylvanMarkArrow(target) {
        if (!window.gameInstance) return;

        // Create projectile from this ball to target
        const dx = target.x - this.x;
        const dy = target.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 0) {
            const speed = 5; // Projectile speed
            const vx = (dx / distance) * speed;
            const vy = (dy / distance) * speed;

            const projectile = new Projectile(
                this.x, this.y, vx, vy, 15, 'sylvanMarkArrow', this.id, target.id
            );

            window.gameInstance.projectiles.push(projectile);
        }
    }


    createBattleRoarEffect(balls) {
        if (!window.gameInstance) return;

        window.gameInstance.createVisualEffect(
            this.x,
            this.y,
            'battleRoarWave',
            0.5,
            {
                radius: 180,
                lineWidth: 10,
                size: 180
            }
        );

        setTimeout(() => {
            if (!Array.isArray(balls)) return;
            balls.forEach(ball => {
                if (ball.id !== this.id) {
                    const distance = Math.hypot(ball.x - this.x, ball.y - this.y);
                    if (distance <= 180 + ball.radius) {
                        ball.applyBattleRoarDebuff(3);
                    }
                }
            });
        }, 0);
    }

    createHeadbuttEffect(target) {
        if (!window.gameInstance) return;

        // Create headbutt effect
        window.gameInstance.createVisualEffect(
            target.x, target.y, 'explosion', 0.4,
            { size: 20, color: '#ff4400' }
        );
    }

    startHeadbutt(target) {
        if (!target) return;
        this.headbuttActive = true;
        this.headbuttTargetId = target.id;
        this.headbuttStoredVelocity = { vx: this.vx, vy: this.vy };
        this.updateHeadbuttVelocity(target);
    }

    updateHeadbuttVelocity(target) {
        const dx = target.x - this.x;
        const dy = target.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy) || 1;
        this.vx = (dx / distance) * this.headbuttSpeed;
        this.vy = (dy / distance) * this.headbuttSpeed;
    }

    updateHeadbutt(balls) {
        if (!this.headbuttActive) return;

        const target = balls.find(ball => ball.id === this.headbuttTargetId);
        if (!target) {
            this.finishHeadbutt(false);
            return;
        }

        // Only move if not CC'd
        if (!this.stunDuration && !this.feared && !this.rooted) {
            this.updateHeadbuttVelocity(target);
            this.x += this.vx;
            this.y += this.vy;

            if (window.gameInstance && window.gameInstance.canvas) {
                const canvas = window.gameInstance.canvas;
                this.x = Math.max(this.radius, Math.min(canvas.width - this.radius, this.x));
                this.y = Math.max(this.radius, Math.min(canvas.height - this.radius, this.y));
            }
        }

        // Collision check remains active even if CC'd
        const distanceToTarget = Math.hypot(target.x - this.x, target.y - this.y);
        if (distanceToTarget <= this.radius + target.radius) {
            // Play collision sound
            if (window.gameInstance) {
                window.gameInstance.playSound('Headbutt_Collision');
            }

            this.createHeadbuttEffect(target);
            this.dealDamage(target, 4, { skillName: 'headbutt', skillType: 'active', fixedDamage: true });
            if (!target.checkCCDodge()) {
                const stunDuration = target.applyCCDurationReduction(0.8);
                target.stunDuration = Math.max(target.stunDuration || 0, stunDuration);
            }
            this.finishHeadbutt(true);
        }
    }

    finishHeadbutt(applyCooldown = true) {
        this.headbuttActive = false;
        this.headbuttTargetId = null;
        if (this.headbuttStoredVelocity) {
            this.vx = this.headbuttStoredVelocity.vx;
            this.vy = this.headbuttStoredVelocity.vy;
            this.headbuttStoredVelocity = null;
        }
        if (applyCooldown) {
            this.activeSkillCooldown = 4;
        }
    }

    startBloodFrenzy() {
        this.bloodFrenzyStacks = 3;
        this.bloodFrenzyActive = true;
        this.bloodFrenzyAnimationStart = null;
        this.createBloodFrenzyEffect();
    }

    consumeBloodFrenzyStack() {
        if (!this.bloodFrenzyActive || this.bloodFrenzyStacks <= 0) return;
        this.bloodFrenzyStacks--;
        if (this.bloodFrenzyStacks <= 0) {
            this.finishBloodFrenzy();
        }
    }

    finishBloodFrenzy() {
        this.bloodFrenzyActive = false;
        this.bloodFrenzyAnimationStart = null;
        this.activeSkillCooldown = 4;
    }

    createBloodFrenzyEffect() {
        this.bloodFrenzyAnimationStart = null;
    }

    createShieldBashEffect(target) {
        if (!window.gameInstance) return;

        // Create shield bash effect
        window.gameInstance.createVisualEffect(
            target.x, target.y, 'explosion', 0.3,
            { size: 18, color: '#0088ff' }
        );
    }

    createTacticalRollEffect() {
        if (!window.gameInstance) return;

        // Create roll effect
        window.gameInstance.createVisualEffect(
            this.x, this.y, 'wind', 1.0,
            { size: 25, color: '#ffffff' }
        );
    }

    createBattleFocusEffect() {
        if (!window.gameInstance) return;

        // Create focus effect
        window.gameInstance.createVisualEffect(
            this.x, this.y, 'light', 1.5,
            { size: 30, color: '#ffff00' }
        );
    }

    createExecutionStrikeEffect(target) {
        if (!window.gameInstance) return;

        // Create execution effect
        window.gameInstance.createVisualEffect(
            target.x, target.y, 'explosion', 0.5,
            { size: 25, color: '#ff0000' }
        );
    }


    createSoulLeechEffect(target) {
        if (!window.gameInstance) return;

        // Create soul leech effect
        window.gameInstance.createVisualEffect(
            this.x, this.y, 'heal', 0.5,
            { size: 15, color: '#00ff00' }
        );
    }


    createInfernalChainsEffect(target) {
        if (!window.gameInstance) return;

        // Create chains effect
        window.gameInstance.createVisualEffect(
            target.x, target.y, 'ice', 1.5,
            { size: 30, color: '#ff4400' }
        );
    }

    createBloodEffect(target) {
        if (!window.gameInstance) return;

        // Create blood effect that follows the target and lasts for bleed duration
        window.gameInstance.createVisualEffect(
            target.x, target.y, 'blood', 3.0, // Last for 3 seconds (bleed duration)
            { size: 15, color: '#ff0000', imageKey: 'bloodEffect', followTarget: target }
        );
    }

    createFloatingDamageText(target, damage) {
        if (!window.gameInstance) return;

        // Generate random color (not red or blue)
        const colors = [
            '#ffff00', // Yellow
            '#00ff00', // Green
            '#ff00ff', // Magenta
            '#ffa500', // Orange
            '#00ffaa', // Teal
            '#ffaaff', // Pink
            '#aaff00', // Lime
            '#ffffff', // White
            '#ffcc00', // Gold
            '#00ff88'  // Spring Green
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        // Create floating damage text above the ball
        const damageText = {
            x: target.x,
            y: target.y - target.radius - 10,
            text: `-${damage}HP`,
            startTime: Date.now(),
            duration: 0.5, // 0.5 seconds
            followTarget: target,
            offsetY: -target.radius - 10,
            moveSpeed: 40, // pixels per second upward
            color: randomColor
        };

        // Add to game instance for rendering
        if (!window.gameInstance.floatingDamageTexts) {
            window.gameInstance.floatingDamageTexts = [];
        }
        window.gameInstance.floatingDamageTexts.push(damageText);
    }

    createFloatingCriticalText(target) {
        if (!window.gameInstance) return;

        // Create floating "CRITICAL!" text above the ball - same position as damage text
        const critText = {
            x: target.x,
            y: target.y - target.radius - 10, // Same starting position as damage text
            text: 'CRITICAL!',
            startTime: Date.now(),
            duration: 0.5, // 0.5 seconds
            followTarget: target,
            offsetY: -target.radius - 10, // Same offset as damage text
            moveSpeed: 40 // Same speed as damage text
        };

        // Add to game instance for rendering
        if (!window.gameInstance.floatingCriticalTexts) {
            window.gameInstance.floatingCriticalTexts = [];
        }
        window.gameInstance.floatingCriticalTexts.push(critText);
    }

    createFloatingDodgeText(target) {
        if (!window.gameInstance) return;

        // Create floating "Dodged!" text above the ball - same position as damage text
        const dodgeText = {
            x: target.x,
            y: target.y - target.radius - 10, // Same starting position as damage text
            text: 'Dodged!',
            startTime: Date.now(),
            duration: 0.5, // 0.5 seconds
            followTarget: target,
            offsetY: -target.radius - 10, // Same offset as damage text
            moveSpeed: 40 // Same speed as damage text
        };

        // Add to game instance for rendering
        if (!window.gameInstance.floatingDodgeTexts) {
            window.gameInstance.floatingDodgeTexts = [];
        }
        window.gameInstance.floatingDodgeTexts.push(dodgeText);
    }

    // Ultimate skill visual effects
    createUnstoppableRageEffect() {
        if (!window.gameInstance) return;

        // Create massive aura effect
        window.gameInstance.createVisualEffect(
            this.x, this.y, 'fire', 3.0,
            { size: 60, color: '#ff0000' }
        );
    }

    createEarthshatterEffect(balls) {
        if (!window.gameInstance) return;

        // Create massive earth impact with image
        window.gameInstance.createVisualEffect(
            this.x, this.y, 'earth', 1.5,
            { size: 100, color: '#8B4513', imageKey: 'earthshatter' }
        );

        // Create shockwave
        window.gameInstance.createVisualEffect(
            this.x, this.y, 'explosion', 1.0,
            { size: 120, color: '#ffaa00' }
        );
    }

    createEarthshatterDashEffect() {
        if (!window.gameInstance) return;

        // Create dash line effect - find closest enemy for direction
        const enemies = window.gameInstance.balls.filter(ball => ball.id !== this.id);
        if (enemies.length > 0) {
            const closestEnemy = enemies.reduce((closest, enemy) => {
                const dist = Math.sqrt((enemy.x - this.x) ** 2 + (enemy.y - this.y) ** 2);
                const closestDist = Math.sqrt((closest.x - this.x) ** 2 + (closest.y - this.y) ** 2);
                return dist < closestDist ? enemy : closest;
            });

            // Create dash line
            window.gameInstance.createVisualEffect(
                this.x, this.y, 'beam', 0.8,
                {
                    targetX: closestEnemy.x,
                    targetY: closestEnemy.y,
                    color: '#8B4513',
                    size: 8
                }
            );
        }
    }

    createAnvilOfMountainEffect(balls, target, predictedX, predictedY) {
        if (!window.gameInstance) return;

        // Debug logging to verify coordinates
        console.log(`Creating anvil at predicted position: (${predictedX.toFixed(1)}, ${predictedY.toFixed(1)})`);
        console.log(`Target current position: (${target.x.toFixed(1)}, ${target.y.toFixed(1)})`);

        // Create anvil drop effect at the predicted position passed in
        window.gameInstance.createVisualEffect(
            predictedX, predictedY, 'anvilDrop', 2.0,
            { size: 80, color: '#666666', imageKey: 'anvilOfMountain' }
        );
    }

    createUnbreakableBastionEffect() {
        if (!window.gameInstance) return;

        window.gameInstance.createVisualEffect(
            this.x,
            this.y,
            'unbreakableBastion',
            3.0,
            {
                size: this.radius * 2,
                followTarget: this
            }
        );
    }


    createSpiritOfForestEffect() {
        if (!window.gameInstance) return;

        // Create Spirit of Forest effect above the ball (like Last Stand)
        window.gameInstance.createVisualEffect(
            this.x, this.y, 'spiritOfForest', 4.0,
            { size: this.radius, followTarget: this, imageKey: 'spiritOfForest' }
        );
    }

    createRegenerationEffect() {
        if (!window.gameInstance) return;

        // Create regeneration effect around the ball
        const angle = Math.random() * Math.PI * 2;
        const distance = 20 + Math.random() * 20; // Random distance around the ball
        const x = this.x + Math.cos(angle) * distance;
        const y = this.y + Math.sin(angle) * distance;

        window.gameInstance.createVisualEffect(
            x, y, 'regeneration', 1.0,
            { size: 15, imageKey: 'regeneration', followTarget: this }
        );
    }

    createFocusedBeamEffect(target) {
        if (!window.gameInstance) return;

        // Play random focused beam sound
        window.gameInstance.playRandomStaffFocusedBeamSound();

        // Create focused beam effect from this ball to target
        const distance = Math.sqrt((target.x - this.x) ** 2 + (target.y - this.y) ** 2);

        // Deal damage immediately when beam is created
        const damage = this.getBasicAttackDamage(target);
        this.dealDamage(target, damage);

        window.gameInstance.createVisualEffect(
            this.x, this.y, 'focusedBeam', 0.75, // 0.75 seconds duration
            {
                size: distance, // Size based on distance
                color: '#9370DB',
                imageKey: 'focusedBeam',
                targetX: target.x,
                targetY: target.y,
                startX: this.x,
                startY: this.y
            }
        );
    }

    createInfernalChainsEffect(target) {
        if (!window.gameInstance) return;

        // Create infernal chains visual effect on the target (animation only)
        window.gameInstance.createVisualEffect(
            target.x, target.y, 'infernalChains', 1.0, // 1 second duration
            {
                size: target.radius, // Same size as ball
                color: '#ff4400',
                imageKey: 'infernalChains',
                followTarget: target
            }
        );
    }

    applyInfernalChainsOnHit(target) {
        if (!window.gameInstance) return;
        if (target && target.immuneToCC) return;

        // Root the target for 1 second
        if (!target.checkCCDodge()) {
            target.rooted = true;
            const rootDuration = target.applyCCDurationReduction(1.0);
            target.rootDuration = rootDuration;
        }

        // Deal 8 damage in 4 instances of 2 damage each (at 0s, 0.25s, 0.5s, 0.75s)
        const caster = this;
        const skillContext = { skillName: 'infernalChains', skillType: 'active' };

        // First damage tick (immediate)
        this.dealDamage(target, 2, skillContext);

        // Second damage tick (at 0.25s)
        setTimeout(() => {
            if (target && target.hp > 0) {
                caster.dealDamage(target, 2, skillContext);
            }
        }, 250);

        // Third damage tick (at 0.5s)
        setTimeout(() => {
            if (target && target.hp > 0) {
                caster.dealDamage(target, 2, skillContext);
            }
        }, 500);

        // Fourth damage tick (at 0.75s)
        setTimeout(() => {
            if (target && target.hp > 0) {
                caster.dealDamage(target, 2, skillContext);
            }
        }, 750);

        // Create infernal chains visual effect on the target
        this.createInfernalChainsEffect(target);
    }

    createSoulLeechEffect(target) {
        if (!window.gameInstance) return;

        // Deal damage and heal half
        const damage = 4;
        this.dealDamage(target, damage, { skillName: 'soulLeech', skillType: 'active' });
        const hpBefore = this.hp;
        this.hp = Math.min(this.maxHp, this.hp + damage / 2);
        if (this.hp > hpBefore) {
            this.triggerAleFueledResilience();
        }

        // Create soul leech visual effect above the target
        window.gameInstance.createVisualEffect(
            target.x, target.y - 30, 'soulLeech', 1.0, // 1 second duration
            {
                size: target.radius, // Same size as ball
                color: '#8B008B',
                imageKey: 'soulLeech',
                followTarget: target,
                offsetY: -30, // Start 30 pixels above the ball
                moveUpward: true,
                moveDistance: 60 // Move 60 pixels upward
            }
        );
    }

    createApocalypseFlameEffect(balls) {
        if (!window.gameInstance) return;

        // Choose a random location on the canvas
        const canvasWidth = window.gameInstance.canvas.width;
        const canvasHeight = window.gameInstance.canvas.height;
        const randomX = Math.random() * (canvasWidth - 100) + 50; // Keep away from edges
        const randomY = Math.random() * (canvasHeight - 100) + 50;

        // Create apocalypse flame visual effect at random location
        const flameEffect = window.gameInstance.createVisualEffect(
            randomX, randomY, 'apocalypseFlame', 5.0, // 5 seconds duration
            {
                size: 50, // Fixed size for the flame
                color: '#ff4400',
                damagePerSecond: 10,
                damageRadius: 50
            }
        );

        // Store reference to the flame effect for damage dealing
        flameEffect.ownerId = this.id;

        // Track last damage time for each enemy (for instant + per-second damage)
        const enemyLastDamageTime = new Map();
        const owner = this;

        // Check and deal damage every frame using an interval (60fps ~= 16ms)
        flameEffect.damageInterval = setInterval(() => {
            const currentTime = Date.now();

            // Deal damage to all enemies standing on the flame
            balls.forEach(ball => {
                if (ball.id !== owner.id) {
                    const distance = Math.sqrt((ball.x - flameEffect.x) ** 2 + (ball.y - flameEffect.y) ** 2);

                    if (distance < flameEffect.data.damageRadius) {
                        // Check if this enemy should receive damage
                        const lastDamageTime = enemyLastDamageTime.get(ball.id);

                        if (!lastDamageTime) {
                            // Enemy just entered - deal damage instantly
                            owner.dealDamage(ball, flameEffect.data.damagePerSecond, { skillName: 'apocalypseFlame', skillType: 'ultimate' });
                            enemyLastDamageTime.set(ball.id, currentTime);
                        } else if (currentTime - lastDamageTime >= 1000) {
                            // Enemy still in area and 1 second passed - deal damage again
                            owner.dealDamage(ball, flameEffect.data.damagePerSecond, { skillName: 'apocalypseFlame', skillType: 'ultimate' });
                            enemyLastDamageTime.set(ball.id, currentTime);
                        }
                    } else {
                        // Enemy left the area - reset their timer so they take instant damage if they re-enter
                        enemyLastDamageTime.delete(ball.id);
                    }
                }
            });
        }, 50); // Check frequently for enemy presence

        // Clear the damage interval when the effect ends
        setTimeout(() => {
            if (flameEffect.damageInterval) {
                clearInterval(flameEffect.damageInterval);
            }
        }, 5000);
    }

    createWrathOfWarlordEffect(balls) {
        if (this.wrathOfWarlordActive) return;
        this.wrathOfWarlordActive = true;
        this.wrathStoredVelocity = { vx: this.vx, vy: this.vy };
        this.vx = 0;
        this.vy = 0;

        const angle = Math.random() * Math.PI * 2;
        const offsetDistance = this.radius * 1.8;
        const animX = this.x + Math.cos(angle) * offsetDistance;
        const animY = this.y + Math.sin(angle) * offsetDistance;
        this.wrathEffectPosition = { x: animX, y: animY };

        if (window.gameInstance) {
            window.gameInstance.createVisualEffect(
                animX,
                animY,
                'wrathOfWarlord',
                1.0,
                { size: this.radius * 2 }
            );
        }

        setTimeout(() => {
            if (this.wrathOfWarlordActive) {
                this.createWrathOfWarlordWave(balls);
            }
            if (this.wrathOfWarlordActive && this.wrathStoredVelocity) {
                this.vx = this.wrathStoredVelocity.vx;
                this.vy = this.wrathStoredVelocity.vy;
                this.wrathStoredVelocity = null;
            }
        }, 500);

        setTimeout(() => {
            this.endWrathOfWarlord();
        }, 1000);
    }

    createWrathOfWarlordWave(balls) {
        if (!window.gameInstance) return;
        const center = this.wrathEffectPosition || { x: this.x, y: this.y };

        window.gameInstance.createVisualEffect(
            center.x,
            center.y,
            'wrathOfWarlordWave',
            0.6,
            {
                radius: 250,
                lineWidth: 14
            }
        );

        if (!Array.isArray(balls)) return;

        balls.forEach(ball => {
            if (ball.id === this.id) return;
            const distance = Math.hypot(ball.x - center.x, ball.y - center.y);
            if (distance <= 250 + ball.radius) {
                this.dealDamage(ball, 12, { skillName: 'wrathOfWarlord', skillType: 'ultimate', fixedDamage: true });
                ball.applyFear(1.3);
                this.knockbackTarget(ball);
            }
        });
    }

    endWrathOfWarlord() {
        this.wrathOfWarlordActive = false;
        this.wrathEffectPosition = null;
        if (this.wrathStoredVelocity) {
            this.vx = this.wrathStoredVelocity.vx;
            this.vy = this.wrathStoredVelocity.vy;
            this.wrathStoredVelocity = null;
        }
    }

    knockbackTarget(target, strength = 6) {
        const angle = Math.atan2(target.y - this.y, target.x - this.x);
        const currentSpeed = Math.max(strength, Math.sqrt(target.vx * target.vx + target.vy * target.vy));
        target.vx = Math.cos(angle) * currentSpeed;
        target.vy = Math.sin(angle) * currentSpeed;
    }

    createLastStandEffect() {
        if (!window.gameInstance) return;

        // Create last stand effect
        window.gameInstance.createVisualEffect(
            this.x, this.y, 'light', 3.0,
            { size: 40, color: '#ffff00' }
        );
    }

    createBattleCryEffect() {
        if (!window.gameInstance) return;

        // Create battle cry visual effect centered on the ball
        window.gameInstance.createVisualEffect(
            this.x, this.y, 'image', 1.5, // 1.5 seconds duration
            {
                size: this.radius * 2, // Same size as the ball
                imageKey: 'battleCry',
                followTarget: this // Make it follow the ball
            }
        );
    }

    createUnstoppableRageEffect() {
        if (!window.gameInstance) return;

        // Create unstoppable rage visual effect above the ball
        window.gameInstance.createVisualEffect(
            this.x, this.y - this.radius - 20, 'unstoppableRage', 6.0, // 6 seconds duration
            {
                size: this.radius, // Half the ball size
                followTarget: this, // Make it follow the ball
                offsetY: -this.radius - 20 // Keep it above the ball's head
                // No imageKey - this ensures renderUnstoppableRage is called instead of renderImage
            }
        );
    }

    createEarthshatterLeapEffect(target, balls) {
        if (!window.gameInstance) return;

        // Store original position and size
        const startX = this.x;
        const startY = this.y;
        const originalRadius = this.radius;

        // Calculate leap destination (near enemy, not on top)
        const angle = Math.atan2(target.y - this.y, target.x - this.x);
        const leapDistance = 60; // Distance from enemy
        const endX = target.x - Math.cos(angle) * leapDistance;
        const endY = target.y - Math.sin(angle) * leapDistance;

        // Keep within canvas bounds
        const finalX = Math.max(this.radius, Math.min(window.gameInstance.canvas.width - this.radius, endX));
        const finalY = Math.max(this.radius, Math.min(window.gameInstance.canvas.height - this.radius, endY));

        // Calculate leap duration based on distance (minimum 0.5s, maximum 2s)
        const totalDistance = Math.sqrt((finalX - startX) ** 2 + (finalY - startY) ** 2);
        const leapDuration = Math.max(0.5, Math.min(2.0, totalDistance / 200)); // Scale with distance

        // Start leap animation
        this.earthshatterLeapActive = true;
        this.earthshatterLeapStartX = startX;
        this.earthshatterLeapStartY = startY;
        this.earthshatterLeapEndX = finalX;
        this.earthshatterLeapEndY = finalY;
        this.earthshatterLeapProgress = 0;
        this.earthshatterLeapDuration = leapDuration; // Dynamic duration based on distance
        this.earthshatterTarget = target;

        // Set cooldown immediately
        this.ultimateCooldown = 12;
    }

    createEarthshatterEffect(target) {
        if (!window.gameInstance) return;

        // Create earthshatter animation effect on the enemy
        window.gameInstance.createVisualEffect(
            target.x, target.y, 'earthshatter', 1.5, // 1.5 seconds duration
            {
                size: target.radius * 2, // Same size as target ball
                followTarget: target
                // No imageKey - this ensures renderEarthshatter is called instead of renderImage
            }
        );
    }

    createAttackEffect(target, attackType) {
        if (!window.gameInstance) return;

        // Create attack visual effect on the enemy
        window.gameInstance.createVisualEffect(
            target.x, target.y, 'image', 1.0, // 1 second duration
            {
                size: target.radius * 2, // Same size as target ball
                imageKey: attackType,
                followTarget: target
            }
        );
    }

    createTwinStrikesEffect(target) {
        if (!window.gameInstance) return;

        // Create twin strikes animation effect on the enemy
        window.gameInstance.createVisualEffect(
            target.x, target.y, 'twinStrikes', 1.0, // 1 second duration
            {
                size: target.radius * 2, // Same size as target ball
                followTarget: target
            }
        );
    }

    createWhirlwindSlashEffect(target) {
        if (!window.gameInstance) return;

        // Create whirlwind slash animation effect on the enemy
        window.gameInstance.createVisualEffect(
            target.x, target.y, 'whirlwindSlash', 1.0, // 1 second duration
            {
                size: target.radius * 2, // Same size as target ball
                followTarget: target
            }
        );
    }

    createHerosWrathEffect(target) {
        if (!window.gameInstance) return;

        // Create multiple strike effects
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                window.gameInstance.createVisualEffect(
                    target.x, target.y, 'slash', 0.4,
                    { angle: Math.random() * Math.PI * 2, size: 35, color: '#ff0000' }
                );
            }, i * 200);
        }
    }

    createDemonicAscensionEffect() {
        if (!window.gameInstance) return;

        // Create demonic ascension image above the ball
        window.gameInstance.createVisualEffect(
            this.x, this.y - 40, 'demonicAscensionActive', 4.0, // 4 seconds duration
            {
                size: this.radius, // Half the size of the ball
                followTarget: this,
                offsetY: -40 // Position above the ball
            }
        );
    }

    createDreadAuraEffect(balls) {
        if (!window.gameInstance) return;

        // Track which enemies have been hit for damage intervals
        const hitEnemies = new Set();
        const caster = this;

        // Create expanding purple wave (ring) that expands outward to 160 radius
        const waveEffect = window.gameInstance.createVisualEffect(
            this.x, this.y, 'dreadAuraWave', 0.8, // 0.8 seconds to expand
            {
                startRadius: 0,
                endRadius: 160,
                color: '#8B008B', // Purple color
                lineWidth: 8,
                ownerId: this.id,
                caster: this,
                balls: balls,
                followTarget: this // Make wave follow the caster
            }
        );

        // Deal damage in 0.5s intervals: 5 damage at 0s, 5 damage at 0.5s = 10 total
        // First damage tick (immediate)
        balls.forEach(ball => {
            if (ball.id !== this.id) {
                const distance = Math.sqrt((ball.x - this.x) ** 2 + (ball.y - this.y) ** 2);
                if (distance < 160) {
                    this.dealDamage(ball, 5, { skillName: 'dreadAura', skillType: 'active' });
                    hitEnemies.add(ball.id);
                }
            }
        });

        // Second damage tick (at 0.5s)
        setTimeout(() => {
            balls.forEach(ball => {
                if (ball.id !== caster.id) {
                    const distance = Math.sqrt((ball.x - caster.x) ** 2 + (ball.y - caster.y) ** 2);
                    if (distance < 160) {
                        caster.dealDamage(ball, 5, { skillName: 'dreadAura', skillType: 'active' });
                    }
                }
            });
        }, 500);

        // Create dread aura visual effect behind the ball (visual only)
        const auraEffect = window.gameInstance.createVisualEffect(
            this.x, this.y, 'dreadAura', 1.2, // 1.2 seconds duration
            {
                size: this.radius * 2, // Same size as ball
                followTarget: this,
                auraRadius: this.radius * 2,
                behindBall: true, // Flag to draw behind the ball
                ownerId: this.id
            }
        );
    }


    createVolley(target, damage) {
        // Fire 3 arrows with 0.1 second delay between each
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                // Recalculate target position for each arrow (in case target moved)
                const currentTarget = this.aiTarget || target;
                if (currentTarget && currentTarget.hp > 0) {
                    this.createProjectile(currentTarget, damage);
                }
            }, i * 100); // 100ms delay between arrows
        }
    }

    createScatterShot(target, damage) {
        // Fire 2 bolts with 0.1 second delay between each
        for (let i = 0; i < 2; i++) {
            setTimeout(() => {
                // Recalculate target position for each bolt
                const currentTarget = this.aiTarget || target;
                if (currentTarget && currentTarget.hp > 0) {
                    this.createProjectile(currentTarget, damage);
                }
            }, i * 100); // 100ms delay between bolts
        }
    }

    createProjectile(target, damage, projectileType = null, context = {}) {
        // Bake critical hit chance at moment of firing
        if (context.critChance === undefined) {
            context.critChance = this.getCritChance();
        }

        // Calculate direction to target
        const dx = target.x - this.x;
        const dy = target.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance === 0) return; // Avoid division by zero

        // Normalize direction and set speed
        let speed = 8; // Default speed
        if (projectileType === 'throwingAxe') {
            speed = 4; // Slower speed for throwing axe
        } else if (projectileType === 'axeThrow') {
            speed = 5; // Speed for axe throw
        } else if (projectileType === 'frenziedSlash') {
            speed = 4; // Half speed for frenzied slash
        } else if (projectileType === 'hammerStrikeProjectile' || projectileType === 'stoneTossProjectile') {
            speed = 5;
        } else if (projectileType === 'infernalChainsProjectile') {
            speed = 4; // Speed for infernal chains
        }
        const vx = (dx / distance) * speed;
        const vy = (dy / distance) * speed;

        // Determine projectile type based on weapon or provided type
        let finalProjectileType = projectileType || 'arrow';
        let piercing = false;
        let explosive = false;

        // If projectile type is provided (from skills), use it directly
        if (projectileType) {
            // Use the provided projectile type
        } else {
            // Determine projectile type based on weapon
            switch (this.weapon) {
                case 'bow':
                    if (this.attack === 'piercingArrow') {
                        finalProjectileType = 'piercingArrow';
                        piercing = true;
                    } else {
                        finalProjectileType = 'arrow';
                    }
                    break;
                case 'crossbow':
                    finalProjectileType = 'bolt';
                    if (this.attack === 'explosiveBolt') {
                        explosive = true;
                        context.projectileImageKey = 'crossbowExplosiveBolt';
                    } else {
                        context.projectileImageKey = 'crossbowBolt';
                    }
                    context.projectileSize = 60; // Size for crossbow bolts (40 * 1.5 = 60)
                    break;
                case 'staff':
                    // Determine projectile type based on attack
                    if (this.attack === 'elementalBurst') {
                        finalProjectileType = 'elementalBurst';
                    } else if (this.attack === 'arcaneBolt') {
                        finalProjectileType = 'arcaneBolt';
                    } else if (this.attack === 'focusedBeam') {
                        // Focused beam is not a projectile, create beam effect instead
                        this.createFocusedBeamEffect(target);
                        return; // Don't create a projectile
                    } else {
                        finalProjectileType = 'arcaneBolt'; // Default for staff
                    }
                    break;
                case 'sword':
                    // Sword creates a sword projectile
                    finalProjectileType = 'sword';
                    break;
                case 'dualSword':
                    // Dual sword creates a dual sword projectile
                    finalProjectileType = 'dualSword';
                    if (this.attack === 'bleedingCuts') {
                        context.dotDamageTotal = 2;
                        context.dotDuration = 2;
                    }
                    break;
                case 'axeThrow':
                    // Axe throw creates an axe throw projectile
                    finalProjectileType = 'axeThrow';
                    break;
                case 'frenziedSlash':
                    // Frenzied slash creates a frenzied slash projectile
                    finalProjectileType = 'frenziedSlash';
                    break;
                case 'unarmed':
                    // Unarmed weapons don't create projectiles by default
                    break;
            }
        }

        // Create projectile
        const projectile = new Projectile(
            this.x, this.y, vx, vy, damage, finalProjectileType, this.id, target.id, context
        );

        // Set custom lifetime for frenzied slash (120 pixel range)
        if (finalProjectileType === 'frenziedSlash') {
            projectile.lifetime = 120 / speed; // Calculate lifetime based on range and speed
        }

        projectile.piercing = piercing;
        projectile.explosive = explosive;

        // For piercing projectiles, track which enemies have been hit to prevent multiple damage
        if (piercing) {
            projectile.piercingHitEnemies = new Set();
        }

        // Add heat seeking for bow/crossbow during Battle Focus
        if (this.battleFocusStacks > 0 && (this.weapon === 'bow' || this.weapon === 'crossbow')) {
            projectile.heatSeeking = true;
            projectile.targetId = target.id;
        }

        // Add to game projectiles (we need to access the game instance)
        // We'll handle this in the game class
        if (window.gameInstance) {
            window.gameInstance.projectiles.push(projectile);

            // Play bow shoot sound when a bow arrow is fired
            if (this.weapon === 'bow' && (finalProjectileType === 'arrow' || finalProjectileType === 'piercingArrow')) {
                window.gameInstance.playRandomBowShootSound();
            }

            // Play staff low sound when Arcane Bolt or Elemental Burst is fired
            if (this.weapon === 'staff' && (finalProjectileType === 'arcaneBolt' || finalProjectileType === 'elementalBurst')) {
                window.gameInstance.playRandomStaffLowSound();
            }

            // Play crossbow shoot sound
            if (this.weapon === 'crossbow') {
                window.gameInstance.playRandomCrossbowShootSound();
            }
        }
    }

    getBasicAttackDamage(target = null) {
        const attackData = {
            preciseShot: 5,
            volley: 3,
            piercingArrow: 4,
            whirlwindSlash: 5,
            twinStrikes: 3,
            bleedingCuts: 3,
            heavySlash: 7,
            quickJab: 4,
            shieldBreaker: 5,
            arcaneBolt: 5,
            elementalBurst: 5,
            focusedBeam: 4,
            sniperBolt: 6,
            scatterShot: 3,
            explosiveBolt: 4,
            ironFist: 4,
            flurryOfBlows: 2,
            grappleSlam: 5
        };

        let baseDamage = attackData[this.attack] || 5;

        // Apply Execution Strike bonus if active
        // +3 damage when enemy is above 50% HP, +6 damage when enemy is below 50% HP
        if (this.executionStrikeStacks > 0) {
            if (target && target.hp < target.maxHp * 0.5) {
                baseDamage += 6; // +6 damage bonus when enemy below 50% HP
            } else {
                baseDamage += 3; // +3 damage bonus when enemy above 50% HP (or no target)
            }
        }

        // Apply Battle Cry bonus if active
        if (this.battleCryActive && this.battleCryDamageBonus) {
            baseDamage += this.battleCryDamageBonus; // +2 damage bonus
        }

        // Apply Unstoppable Rage bonus if active
        if (this.unstoppableRageActive && this.unstoppableRageDamageBonus) {
            baseDamage += this.unstoppableRageDamageBonus; // +5 damage bonus
        }

        if (this.runeChargeActive && this.runeChargeStacks > 0) {
            baseDamage *= 1.5;
            this.consumeRuneChargeStack();
        }

        if (this.battleRoarBonusStacks > 0) {
            baseDamage += 2;
            this.battleRoarBonusStacks--;
            if (this.battleRoarBonusStacks <= 0) {
                this.battleRoarAnimationStart = null;
                if (this.skill === 'battleRoar') {
                    this.activeSkillCooldown = 4;
                }
            }
        }

        if (this.battleRoarDebuffStacks > 0) {
            baseDamage = Math.max(1, baseDamage - 2);
            this.battleRoarDebuffStacks--;
        }

        // Apply Shadowstep damage bonus if active (consumed after use)
        if (this.shadowstepDamageBonus > 0) {
            baseDamage += this.shadowstepDamageBonus;
            this.shadowstepDamageBonus = 0; // Consume after one attack
        }

        // Apply Spirit Bond attack buff if active
        if (this.spiritBondBuffTimer > 0) {
            baseDamage += 2;
        }

        return baseDamage;
    }

    getCritChance() {
        // Use baseCritChance to ensure we start from a valid base value
        let critChance = this.baseCritChance || this.critChance || 0;

        // Apply Keen Sight bonus if passive is active (+30% crit chance)
        if (this.keenSightApplied) {
            critChance += this.keenSightBonus; // +30% crit chance
        }

        // Apply Battle Focus bonus if active (only once, not per stack)
        if (this.battleFocusStacks > 0) {
            critChance += 0.7; // +70% crit chance
        }

        // Ensure crit chance is never negative and cap at 100%
        return Math.max(0, Math.min(critChance, 1.0));
    }

    getBasicAttackDamagePreview(target = null) {
        // Calculate basic attack damage without consuming stacks (for UI display)
        const attackData = {
            preciseShot: 5,
            volley: 3,
            piercingArrow: 4,
            whirlwindSlash: 5,
            twinStrikes: 3,
            bleedingCuts: 3,
            heavySlash: 7,
            quickJab: 4,
            shieldBreaker: 5,
            arcaneBolt: 5,
            elementalBurst: 5,
            focusedBeam: 4,
            sniperBolt: 6,
            scatterShot: 3,
            explosiveBolt: 4,
            ironFist: 4,
            flurryOfBlows: 2,
            grappleSlam: 5
        };

        let baseDamage = attackData[this.attack] || 5;

        // Apply Execution Strike bonus if active
        // +3 damage when enemy is above 50% HP, +6 damage when enemy is below 50% HP
        if (this.executionStrikeStacks > 0) {
            if (target && target.hp < target.maxHp * 0.5) {
                baseDamage += 6; // +6 damage bonus when enemy below 50% HP
            } else {
                baseDamage += 3; // +3 damage bonus when enemy above 50% HP (or no target)
            }
        }

        // Apply Battle Cry bonus if active
        if (this.battleCryActive && this.battleCryDamageBonus) {
            baseDamage += this.battleCryDamageBonus; // +2 damage bonus
        }

        // Apply Unstoppable Rage bonus if active
        if (this.unstoppableRageActive && this.unstoppableRageDamageBonus) {
            baseDamage += this.unstoppableRageDamageBonus; // +5 damage bonus
        }

        // Apply Rune Charge bonus if active (preview - don't consume)
        if (this.runeChargeActive && this.runeChargeStacks > 0) {
            baseDamage *= 1.5;
        }

        // Apply Battle Roar bonus if active (preview - don't consume)
        if (this.battleRoarBonusStacks > 0) {
            baseDamage += 2;
        }

        // Apply Battle Roar debuff if active (preview - don't consume)
        if (this.battleRoarDebuffStacks > 0) {
            baseDamage = Math.max(1, baseDamage - 2);
        }

        // Apply Shadowstep damage bonus if active (preview - don't consume)
        if (this.shadowstepDamageBonus > 0) {
            baseDamage += this.shadowstepDamageBonus;
        }

        // Apply Spirit Bond attack buff if active
        if (this.spiritBondBuffTimer > 0) {
            baseDamage += 2;
        }

        // Apply passive skill damage bonuses (multiplicative)
        if (this.damageBonus) baseDamage *= (1 + this.damageBonus);
        if (this.painEmpowermentBonus) baseDamage *= (1 + this.painEmpowermentBonus);
        if (this.bloodrageBonus) baseDamage *= (1 + this.bloodrageBonus); // Orc Bloodrage
        if (this.bloodRageBonus) baseDamage *= (1 + this.bloodRageBonus); // Barbarian Blood Rage
        if (this.savageMomentumStacks) baseDamage *= (1 + this.savageMomentumStacks * 0.1);

        return Math.round(baseDamage);
    }

    getActiveSkillDamagePreview() {
        // Helper function to apply damage bonuses
        const applyDamageBonuses = (baseDmg) => {
            let dmg = baseDmg;
            if (this.damageBonus) dmg *= (1 + this.damageBonus);
            if (this.painEmpowermentBonus) dmg *= (1 + this.painEmpowermentBonus);
            if (this.bloodrageBonus) dmg *= (1 + this.bloodrageBonus);
            if (this.bloodRageBonus) dmg *= (1 + this.bloodRageBonus);
            if (this.savageMomentumStacks) dmg *= (1 + this.savageMomentumStacks * 0.1);
            if (this.manaAffinityActive) dmg *= 1.3;
            return Math.round(dmg);
        };

        // === STACK-BASED SKILLS ===
        // Fortify: 3 stacks of 50% damage reduction
        if (this.skill === 'fortify') {
            if (this.fortifyActive && this.fortifyStacks > 0) {
                return `Stacks: ${this.fortifyStacks}`;
            }
            return '50% DR';
        }

        // Rune Charge: 3 stacks of 50% damage boost
        if (this.skill === 'runeCharge') {
            if (this.runeChargeActive && this.runeChargeStacks > 0) {
                return `Stacks: ${this.runeChargeStacks}`;
            }
            return '+50% Dmg';
        }

        // Battle Roar: +2 damage per stack, 3 stacks
        if (this.skill === 'battleRoar') {
            if (this.battleRoarBonusStacks > 0) {
                return `Stacks: ${this.battleRoarBonusStacks}`;
            }
            return '+2 Dmg';
        }

        // Blood Frenzy: 50% lifesteal, 3 stacks
        if (this.skill === 'bloodFrenzy') {
            if (this.bloodFrenzyActive && this.bloodFrenzyStacks > 0) {
                return `Stacks: ${this.bloodFrenzyStacks}`;
            }
            return '50% LS';
        }

        // Battle Focus: +70% crit chance, 3 stacks
        if (this.skill === 'battleFocus') {
            if (this.battleFocusStacks > 0) {
                return `Stacks: ${this.battleFocusStacks}`;
            }
            return '+70% Crit';
        }

        // Execution Strike: +3/+6 damage, 3 stacks
        if (this.skill === 'executionStrike') {
            if (this.executionStrikeStacks > 0) {
                return `Stacks: ${this.executionStrikeStacks}`;
            }
            return '+3/+6 Dmg';
        }

        // === UTILITY/BUFF SKILLS (no direct damage) ===
        // Battle Cry: Buff skill
        if (this.skill === 'battleCry') {
            return '+2 Dmg';
        }

        // Tactical Roll: Dodge + speed boost
        if (this.skill === 'tacticalRoll') {
            return 'Dodge';
        }

        // Nature's Grasp: Root skill
        if (this.skill === 'naturesGrasp') {
            return '1.5s Root';
        }

        // Shadowstep: +5 damage for next attack (1 stack)
        if (this.skill === 'shadowstep') {
            if (this.shadowstepDamageBonus > 0) {
                return `Stacks: 1`;
            }
            return '+5 Dmg';
        }

        // === DoT AND SPECIAL DAMAGE SKILLS ===
        // Stone Toss: 6 initial + 1 DoT per second for 3 seconds
        if (this.skill === 'stoneToss') {
            return `${applyDamageBonuses(6)} +1 DoT(3s)`;
        }

        // Frenzied Slash: 3 damage x 3 hits
        if (this.skill === 'frenziedSlash') {
            return `${applyDamageBonuses(3)}(x3)`;
        }

        // Soul Leech: 4 damage + 2 heal
        if (this.skill === 'soulLeech') {
            return `${applyDamageBonuses(4)} +2 Heal`;
        }

        // Dread Aura: 10 damage total (5+5 in 0.5s intervals)
        if (this.skill === 'dreadAura') {
            return `${applyDamageBonuses(10)}`;
        }

        // Infernal Chains: 8 damage (2x4) + 1s root
        if (this.skill === 'infernalChains') {
            return `${applyDamageBonuses(8)} +1s Root`;
        }

        // === DIRECT DAMAGE SKILLS ===
        const directDamageSkills = {
            axeThrow: 7,
            warStomp: 8,
            hammerStrike: 8,
            arrowStorm: 10,
            throwingAxe: 7,
            headbutt: 4,
            shieldBash: 5,
            hellfireBolt: 7,
            sylvanMark: 15 // Projectile damage
        };

        if (directDamageSkills[this.skill] !== undefined) {
            return applyDamageBonuses(directDamageSkills[this.skill]);
        }

        // Default fallback
        return '0';
    }

    getUltimateDamagePreview() {
        // Helper function to apply damage bonuses
        const applyDamageBonuses = (baseDmg) => {
            let dmg = baseDmg;
            if (this.damageBonus) dmg *= (1 + this.damageBonus);
            if (this.painEmpowermentBonus) dmg *= (1 + this.painEmpowermentBonus);
            if (this.bloodrageBonus) dmg *= (1 + this.bloodrageBonus);
            if (this.bloodRageBonus) dmg *= (1 + this.bloodRageBonus);
            if (this.savageMomentumStacks) dmg *= (1 + this.savageMomentumStacks * 0.1);
            if (this.manaAffinityActive) dmg *= 1.3;
            return Math.round(dmg);
        };

        // === BARBARIAN ===
        // Unstoppable Rage: +5 Dmg, -1s CD for 6 seconds
        if (this.ultimate === 'unstoppableRage') {
            if (this.unstoppableRageActive) {
                return `Active`;
            }
            return '+5 Dmg, -1s CD';
        }

        // Earthshatter: 12 damage + 1.5s stun
        if (this.ultimate === 'earthshatter') {
            return `${applyDamageBonuses(12)} +1.5s Stun`;
        }

        // === DWARF ===
        // Anvil of Mountain: 25 damage
        if (this.ultimate === 'anvilOfMountain') {
            return `${applyDamageBonuses(25)}`;
        }

        // Hammer of Mountain: 14 damage + 1.2s stun (collision-based)
        if (this.ultimate === 'hammerOfMountain') {
            if (this.ultimateCooldown <= 0) {
                return 'Ready';
            }
            return `${applyDamageBonuses(14)} +1.2s Stun`;
        }

        // Unbreakable Bastion: 5 damage + 1.3s taunt + shield
        if (this.ultimate === 'unbreakableBastion') {
            if (this.unbreakableBastionActive) {
                return 'Active';
            }
            return `5 +1.3s Taunt`;
        }

        // === ELF ===
        // Rain of Stars: 12 damage (AoE zones)
        if (this.ultimate === 'rainOfStars') {
            if (this.rainOfStarsStopped) {
                return 'Active';
            }
            return `${applyDamageBonuses(12)} AoE`;
        }

        // Spirit of Forest: +80% Speed, 3 HP/s Regen for 4s
        if (this.ultimate === 'spiritOfForest') {
            if (this.spiritOfForestDuration > 0) {
                return 'Active';
            }
            return '+80% Spd, 3 HP/s';
        }

        // === ORC ===
        // Wrath of Warlord: 12 damage + 1.3s fear
        if (this.ultimate === 'wrathOfWarlord') {
            return `${applyDamageBonuses(12)} +1.3s Fear`;
        }

        // Unstoppable Strength: CC Immunity for 3s
        if (this.ultimate === 'unstoppableStrength') {
            if (this.unstoppableStrengthActive) {
                return 'Active';
            }
            return 'CC Immune 3s';
        }

        // === HUMAN ===
        // Last Stand: 30% HP Shield + 20% Dmg Bonus
        if (this.ultimate === 'lastStand') {
            if (this.lastStandActive) {
                return 'Active';
            }
            return '30% Shield, +20% Dmg';
        }

        // Hero's Wrath: 7 damage x3 (collision-based)
        if (this.ultimate === 'herosWrath') {
            if (this.ultimateCooldown <= 0) {
                return 'Ready';
            }
            return `${applyDamageBonuses(7)}(x3)`;
        }

        // === DEMON ===
        // Demonic Ascension: +30% Dmg + 30% Lifesteal for 4s
        if (this.ultimate === 'demonicAscension') {
            if (this.demonicAscensionDuration > 0) {
                return 'Active';
            }
            return '+30% Dmg, 30% LS';
        }

        // Apocalypse Flame: 7 DoT per second for 5 seconds (35 total)
        if (this.ultimate === 'apocalypseFlame') {
            return '7 DoT(5s)';
        }

        // Default fallback
        return '0';
    }

    getTotalDefence() {
        // Calculate total defense including all bonuses
        let totalDefence = this.defense || 0;

        // Add defense bonuses
        if (this.defenseBonus) totalDefence += this.defenseBonus;
        if (this.ironhideBonus) totalDefence += this.ironhideBonus;
        if (this.stonefleshBonus) totalDefence += this.stonefleshBonus;

        // Add Ale-Fueled Resilience defense if active
        if (this.aleFueledResilienceActive && this.aleFueledResilienceDuration > 0) {
            totalDefence += 1;
        }

        // Add Shield Bash defense bonus if active
        if (this.shieldBashDefenseDuration > 0) {
            totalDefence += this.shieldBashDefenseBonus;
        }

        // Spirit Bond Buff
        if (this.spiritBondBuffTimer > 0) {
            totalDefence += 1;
        }

        return Math.round(totalDefence);
    }

    useActiveSkill(target, balls) {
        if (this.stunDuration > 0 || this.feared) {
            return;
        }

        // Check for Shadow Puppeteer cancellation (5% chance)
        if (target && this.checkShadowPuppeteerCancel && this.checkShadowPuppeteerCancel(target)) {
            // Set cooldown even when cancelled (for all skills)
            this.activeSkillCooldown = this.applyCooldownReduction(4); // 4 second cooldown (reduced by passives)
            return; // Move cancelled - skill will not execute
        }

        // Don't set cooldown for self-managed skills - they handle cooldown when their effect ends
        const selfManagedSkills = ['executionStrike', 'battleFocus', 'warStomp', 'battleCry', 'fortify', 'runeCharge', 'battleRoar', 'headbutt', 'bloodFrenzy'];
        if (!selfManagedSkills.includes(this.skill)) {
            this.activeSkillCooldown = this.applyCooldownReduction(4); // 4 second cooldown (reduced by passives)
        } else if (this.skill === 'battleRoar' && this.battleRoarBonusStacks > 0) {
            return;
        } else if (this.skill === 'headbutt' && this.headbuttActive) {
            return;
        } else if (this.skill === 'bloodFrenzy' && this.bloodFrenzyStacks > 0) {
            return;
        } else if (this.skill === 'battleFocus' && this.battleFocusStacks > 0) {
            return;
        } else if (this.skill === 'executionStrike' && this.executionStrikeStacks > 0) {
            return;
        }

        // Implement active skill logic based on selected skill
        this.executeActiveSkill(target, balls);
    }

    executeActiveSkill(target, balls) {
        // Play sound effect for this skill
        if (window.gameInstance && this.skill) {
            // Special case: Axe Throw, Frenzied Slash, Hammer Strike, Stone Toss, Throwing Axe, Hellfire Bolt, Infernal Chains, and Arrow Storm use "Throw" sound when casting
            if (this.skill === 'axeThrow' || this.skill === 'frenziedSlash' || this.skill === 'hammerStrike' || this.skill === 'stoneToss' || this.skill === 'throwingAxe' || this.skill === 'hellfireBolt' || this.skill === 'infernalChains' || this.skill === 'arrowStorm') {
                window.gameInstance.playSound('Throw');
            } else if (this.skill !== 'warStomp' && this.skill !== 'fortify' && this.skill !== 'runeCharge' && this.skill !== 'battleFocus' && this.skill !== 'executionStrike') {
                // War Stomp is collision-based, sound plays on collision, not on skill use
                // Fortify sound only plays when stacks are consumed, not when skill is used
                // Rune Charge sound plays once in activateRuneCharge, not here
                // Battle Focus and Execution Strike sounds play once in their respective functions, not here
                window.gameInstance.playSound(this.skill);
            }
        }

        const skillData = {
            // Barbarian
            axeThrow: () => {
                // Create axe throw projectile (like orc throwing axe)
                this.createProjectile(target, 7, 'axeThrow', { skillName: 'axeThrow', skillType: 'active' });
            },
            frenziedSlash: () => {
                // Create frenzied slash projectile
                this.createProjectile(target, 7, 'frenziedSlash', { skillName: 'frenziedSlash', skillType: 'active' });
            },
            warStomp: () => {
                // War stomp is now collision-based, not skill-based
                // This method is kept for compatibility but shouldn't be called
            },
            battleCry: () => {
                this.createBattleCryEffect();
                this.battleCryActive = true;
                this.battleCryDuration = 1.5; // 1.5 seconds duration
                this.battleCryCooldownReduction = 1.25; // 25% faster cooldown reduction (multiplier)
                this.battleCryDamageBonus = 2; // +2 damage bonus
            },

            // Dwarf
            hammerStrike: () => {
                const damage = 5;
                this.createProjectile(target, damage, 'hammerStrikeProjectile', {
                    skillName: 'hammerStrike',
                    skillType: 'active',
                    projectileImageKey: 'hammerStrikeFrame1',
                    projectileSize: this.radius * 4, // Larger size to match image dimensions
                    collisionRadius: this.radius,
                    spinSpeed: (Math.PI * 2) / 30 // full rotation every ~0.5s
                });
            },
            stoneToss: () => {
                const damage = 6;
                const projectileSize = this.radius * 4; // Larger size to match image dimensions
                this.createProjectile(target, damage, 'stoneTossProjectile', {
                    skillName: 'stoneToss',
                    skillType: 'active',
                    projectileImageKey: 'stoneTossFrame1',
                    projectileSize,
                    collisionRadius: this.radius,
                    alignToDirection: false,
                    dotDamageTotal: 3, // 1 damage per second for 3 seconds
                    dotDuration: 3
                });
            },
            fortify: () => {
                if (this.fortifyActive || this.fortifyStacks > 0) return;
                this.fortifyActive = true;
                this.fortifyStacks = 3; // 3 stacks of 50% damage reduction
                this.createFortifyEffect();
            },
            runeCharge: () => {
                this.activateRuneCharge();
            },

            // Elf
            arrowStorm: () => {
                // Prevent multiple uses in quick succession
                if (this.arrowStormUsed) return;
                this.arrowStormUsed = true;

                // Create arrow storm projectile - range 100, travels in 0.7 seconds
                this.createArrowStormProjectile(target);

                // Reset flag after a short delay
                setTimeout(() => {
                    this.arrowStormUsed = false;
                }, 100);
            },
            naturesGrasp: () => {
                // Prevent multiple uses in quick succession
                if (this.naturesGraspUsed) return;
                this.naturesGraspUsed = true;

                this.createNaturesGraspEffect(target);
                if (target && target.immuneToCC) {
                    setTimeout(() => {
                        this.naturesGraspUsed = false;
                    }, 100);
                    return;
                }

                // Root the target for 1.5 seconds
                if (!target.checkCCDodge()) {
                    const rootDuration = target.applyCCDurationReduction(1.5);
                    target.rootDuration = rootDuration;
                    target.rooted = true;
                }

                // Reset flag after cooldown
                setTimeout(() => {
                    this.naturesGraspUsed = false;
                }, 100);
            },
            shadowstep: () => {
                // Store original position for animation
                const startX = this.x;
                const startY = this.y;

                // Calculate teleport destination
                const angle = Math.random() * Math.PI * 2;
                const distance = 80;
                const endX = this.x + Math.cos(angle) * distance;
                const endY = this.y + Math.sin(angle) * distance;

                // Create shadowstep animation effect
                this.createShadowstepEffect(startX, startY, endX, endY);

                // Teleport to new location
                this.x = endX;
                this.y = endY;

                // Give +5 damage bonus for the next attack
                this.shadowstepDamageBonus = 5;
            },
            sylvanMark: () => {
                // Prevent multiple uses in quick succession
                if (this.sylvanMarkUsed) return;
                this.sylvanMarkUsed = true;

                // Play original sylvanMark sound when skill is used
                if (window.gameInstance) {
                    window.gameInstance.playSound('sylvanMark');
                }

                // Create Sylvan Mark animation on the target (1 second duration)
                this.createSylvanMarkEffect(target);

                // Launch arrow after 1 second (after animation ends)
                setTimeout(() => {
                    // Play Throw sound when projectile is sent
                    if (window.gameInstance) {
                        window.gameInstance.playSound('Throw');
                    }
                    this.launchSylvanMarkArrow(target);
                }, 1000);

                // Reset flag after cooldown
                setTimeout(() => {
                    this.sylvanMarkUsed = false;
                }, 100);
            },

            // Orc
            throwingAxe: () => {
                // Create throwing axe projectile
                this.createProjectile(target, 7, 'throwingAxe', { skillName: 'throwingAxe', skillType: 'active' });
            },
            battleRoar: () => {
                this.applyBattleRoarBuff(3);
                this.createBattleRoarEffect(balls);
            },
            headbutt: () => {
                if (this.headbuttActive || this.activeSkillCooldown > 0) return;
                const validTarget = target && target.id !== this.id ? target : this.aiTarget;
                if (!validTarget) return;
                this.startHeadbutt(validTarget);
            },
            bloodFrenzy: () => {
                if (this.bloodFrenzyStacks > 0 || this.activeSkillCooldown > 0) return;
                this.startBloodFrenzy();
            },

            // Human
            shieldBash: () => {
                // Transform ball into shield and rush toward enemy
                this.shieldBashActive = true;
                this.shieldBashTarget = target;
                this.shieldBashDuration = 1.0; // 1 second rush
                this.shieldBashDamage = 5;

                // Calculate rush direction
                const dx = target.x - this.x;
                const dy = target.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                this.shieldBashVx = (dx / distance) * 3.75; // Quarter speed
                this.shieldBashVy = (dy / distance) * 3.75;

                // Create trail effect
                this.createShieldBashTrailEffect();
            },
            tacticalRoll: () => {
                this.createTacticalRollEffect();
                // Dodge next attack and gain speed
                this.dodgeNextAttack = true;
                this.speedBonus = 1.5;
                this.tacticalRollDuration = 3;
            },
            battleFocus: () => {
                // Play sound only once when skill is first used (stacks should be 0 at this point)
                if (window.gameInstance && this.battleFocusStacks === 0) {
                    window.gameInstance.playSound('battleFocus');
                }

                // Empower next 3 basic attacks instead of dealing direct damage
                this.battleFocusStacks = 3;
                this.createBattleFocusEffect(this); // Effect follows the ball
                // Don't put skill on cooldown yet - it will be set when stacks are used up
            },
            executionStrike: () => {
                // Play sound only once when skill is first used (stacks should be 0 at this point)
                if (window.gameInstance && this.executionStrikeStacks === 0) {
                    window.gameInstance.playSound('executionStrike');
                }

                // Empower next 3 basic attacks instead of dealing direct damage
                this.executionStrikeStacks = 3;
                this.createExecutionStrikeEffect(this); // Effect follows the ball
                // Don't put skill on cooldown yet - it will be set when stacks are used up
            },

            // Demon
            hellfireBolt: () => {
                // Create hellfire bolt projectile
                this.createProjectile(target, 7, 'hellfireBolt', { skillName: 'hellfireBolt', skillType: 'active' });
            },
            soulLeech: () => {
                // Create the effect (handles damage and healing internally)
                this.createSoulLeechEffect(target);
            },
            dreadAura: () => {
                // Create the effect (handles damage and slow internally)
                this.createDreadAuraEffect(balls);
            },
            infernalChains: () => {
                // Create infernal chains projectile - skillshot
                this.createProjectile(target, 0, 'infernalChainsProjectile', {
                    skillName: 'infernalChains',
                    skillType: 'active',
                    projectileImageKey: 'infernalChainsFrame1',
                    projectileSize: this.radius * 2,
                    collisionRadius: this.radius
                });
            }
        };

        const skill = skillData[this.skill];
        if (skill) {
            skill();
        } else {
            // Default damage
            this.dealDamage(target, 8, { skillName: this.skill || 'Unknown Skill', skillType: 'active' });
        }
    }

    useUltimate(target, balls) {
        const isUnstoppableStrengthUltimate = this.ultimate === 'unstoppableStrength';
        if ((this.stunDuration > 0 || this.feared) && !isUnstoppableStrengthUltimate) {
            return;
        }

        // Check for Shadow Puppeteer cancellation (5% chance)
        if (target && this.checkShadowPuppeteerCancel && this.checkShadowPuppeteerCancel(target)) {
            // Set cooldown even when cancelled (for ultimates that don't manage their own cooldown)
            if (this.ultimate !== 'lastStand' && this.ultimate !== 'demonicAscension' && this.ultimate !== 'unbreakableRage' && this.ultimate !== 'unbreakableBastion' && this.ultimate !== 'unstoppableStrength') {
                this.ultimateCooldown = this.applyCooldownReduction(12); // 12 second cooldown (reduced by passives)
            }
            return; // Move cancelled
        }

        if (this.ultimate === 'unbreakableBastion' && this.unbreakableBastionActive) {
            return;
        }

        // Hero's Wrath is collision-based, not a regular ultimate
        if (this.ultimate === 'herosWrath') {
            return; // Don't use Hero's Wrath as regular ultimate
        }

        // Special check for Last Stand - don't use if already active or on cooldown
        if (this.ultimate === 'lastStand') {
            if (this.lastStandActive || this.ultimateCooldown > 0) {
                return; // Don't use Last Stand if it's already active or on cooldown
            }
        }

        // Special check for Demonic Ascension - don't use if already active or on cooldown
        if (this.ultimate === 'demonicAscension') {
            if (this.demonicAscensionDuration > 0 || this.ultimateCooldown > 0) {
                return; // Don't use Demonic Ascension if it's already active or on cooldown
            }
        }

        // Special check for Unstoppable Rage - don't use if already active or on cooldown
        if (this.ultimate === 'unstoppableRage') {
            if (this.unstoppableRageActive || this.ultimateCooldown > 0) {
                return; // Don't use Unstoppable Rage if it's already active or on cooldown
            }
        }

        // Special check for Hammer of Mountain - it's collision-based, don't execute here
        if (this.ultimate === 'hammerOfMountain') {
            return; // Hammer of Mountain is collision-based, not skill-based
        }

        if (isUnstoppableStrengthUltimate) {
            if (this.unstoppableStrengthActive || this.ultimateCooldown > 0) {
                return;
            }
        }

        // Don't set cooldown for Last Stand, Demonic Ascension, Unstoppable Rage, or Hammer of Mountain - they will be set when duration ends or on collision
        if (this.ultimate !== 'lastStand' && this.ultimate !== 'demonicAscension' && this.ultimate !== 'unstoppableRage' && this.ultimate !== 'unbreakableBastion' && this.ultimate !== 'unstoppableStrength' && this.ultimate !== 'hammerOfMountain') {
            this.ultimateCooldown = this.applyCooldownReduction(12); // 12 second cooldown (reduced by passives)
        }

        // Implement ultimate skill logic based on selected ultimate
        this.executeUltimate(target, balls);
    }

    executeUltimate(target, balls) {
        // Play sound effect for this ultimate
        if (window.gameInstance && this.ultimate) {
            // Hammer of Mountain is collision-based, sound plays on collision, not on skill use
            // Rain of Stars sound plays when the real animation starts (after indicator phase), not on skill use
            if (this.ultimate !== 'hammerOfMountain' && this.ultimate !== 'rainOfStars') {
                window.gameInstance.playSound(this.ultimate);
            }
        }

        const ultimateData = {
            // Barbarian
            unstoppableRage: () => {
                this.createUnstoppableRageEffect();
                this.unstoppableRageActive = true;
                this.unstoppableRageDuration = 6; // 6 seconds duration
                this.unstoppableRageCooldownReduction = 1; // 1 second cooldown reduction
                this.unstoppableRageDamageBonus = 5; // +5 damage bonus
            },
            earthshatter: () => {
                this.createEarthshatterLeapEffect(target, balls);
            },

            // Dwarf
            anvilOfMountain: () => {
                const damage = 25;

                // Find the target (closest enemy)
                const enemies = balls.filter(ball => ball.id !== this.id);
                if (enemies.length > 0) {
                    const target = enemies.reduce((closest, enemy) => {
                        const dist = Math.sqrt((enemy.x - this.x) ** 2 + (enemy.y - this.y) ** 2);
                        const closestDist = Math.sqrt((closest.x - this.x) ** 2 + (closest.y - this.y) ** 2);
                        return dist < closestDist ? enemy : closest;
                    });

                    // Calculate predicted position for damage calculation
                    const predictionTime = 2.0;

                    // Account for speed multiplier that's applied in update method
                    let speedMultiplier = 1;
                    if (target.speedBonus) speedMultiplier *= target.speedBonus;
                    if (target.naturesWhisperActive) speedMultiplier *= 1.2;
                    if (target.huntersInstinctActive && target.aiTarget && target.aiTarget.hp < target.aiTarget.maxHp * 0.3) {
                        speedMultiplier *= 1.3;
                    }

                    const predictedX = target.x + (target.vx * speedMultiplier * predictionTime);
                    const predictedY = target.y + (target.vy * speedMultiplier * predictionTime);

                    // Debug logging
                    console.log(`Anvil prediction: Current pos (${target.x.toFixed(1)}, ${target.y.toFixed(1)}), Velocity (${target.vx.toFixed(1)}, ${target.vy.toFixed(1)}), Speed mult: ${speedMultiplier.toFixed(1)}, Predicted pos (${predictedX.toFixed(1)}, ${predictedY.toFixed(1)})`);

                    // Keep within canvas bounds
                    const canvasWidth = window.gameInstance.canvas.width;
                    const canvasHeight = window.gameInstance.canvas.height;
                    const boundedX = Math.max(40, Math.min(canvasWidth - 40, predictedX));
                    const boundedY = Math.max(40, Math.min(canvasHeight - 40, predictedY));

                    this.createAnvilOfMountainEffect(balls, target, boundedX, boundedY);

                    // Delay damage until animation ends (2 seconds)
                    setTimeout(() => {
                        balls.forEach(ball => {
                            if (ball.id !== this.id) {
                                const distance = Math.sqrt((ball.x - boundedX) ** 2 + (ball.y - boundedY) ** 2);
                                if (distance < 120) {
                                    this.dealDamage(ball, damage, { skillName: 'anvilOfMountain', skillType: 'ultimate' });
                                }
                            }
                        });
                    }, 2000); // 2 seconds delay
                }
            },
            hammerOfMountain: () => {
                const enemies = balls.filter(ball => ball.id !== this.id);
                if (!enemies.length) return;

                const primaryTarget = (target && target.id !== this.id) ? target : enemies.reduce((closest, enemy) => {
                    const dist = Math.hypot(enemy.x - this.x, enemy.y - this.y);
                    const closestDist = Math.hypot(closest.x - this.x, closest.y - this.y);
                    return dist < closestDist ? enemy : closest;
                }, enemies[0]);

                if (!primaryTarget) return;

                this.createHammerOfMountainEffect(primaryTarget);

                const impactRadius = primaryTarget.radius * 4;
                balls.forEach(ball => {
                    if (ball.id === this.id) return;
                    const distance = Math.hypot(ball.x - primaryTarget.x, ball.y - primaryTarget.y);
                    if (distance <= impactRadius) {
                        this.dealDamage(ball, 15, { skillName: 'hammerOfMountain', skillType: 'ultimate' });
                        if (!ball.checkCCDodge()) {
                            const stunDuration = ball.applyCCDurationReduction(1);
                            ball.stunDuration = Math.max(ball.stunDuration || 0, stunDuration);
                        }
                    }
                });
            },
            unbreakableBastion: () => {
                if (this.unbreakableBastionActive) return;

                this.unbreakableBastionActive = true;
                this.bastionDuration = 1.3;
                this.unbreakableBastionPosition = { x: this.x, y: this.y };
                this.unbreakableBastionStoredVelocity = { vx: this.vx, vy: this.vy };
                this.vx = 0;
                this.vy = 0;

                // Create wave effect that follows the ball
                if (window.gameInstance) {
                    window.gameInstance.createVisualEffect(
                        this.x,
                        this.y,
                        'unbreakableBastionWave',
                        1.0, // 1 second duration for wave expansion
                        {
                            radius: 150,
                            lineWidth: 8,
                            followTarget: this,
                            caster: this,
                            balls: balls,
                            hitEnemies: new Set() // Track which enemies have been hit
                        }
                    );
                }
            },

            // Elf
            rainOfStars: () => {
                // Prevent multiple triggers
                if (this.rainOfStarsUsed) return;
                this.rainOfStarsUsed = true;

                // Stop the ball
                this.rainOfStarsStoredVx = this.vx;
                this.rainOfStarsStoredVy = this.vy;
                this.vx = 0;
                this.vy = 0;
                this.rainOfStarsStopped = true;

                // Create indicator circles at 3 random locations (Phase 1)
                this.createRainOfStarsIndicators(balls);

                // Reset flag after both phases complete (1s indicators + 1.2s animation)
                setTimeout(() => {
                    this.rainOfStarsUsed = false;
                }, 2500);
            },
            spiritOfForest: () => {
                this.createSpiritOfForestEffect();
                this.speedBonus = 1.8;
                this.hpRegen = 3;
                this.spiritOfForestDuration = 4;
            },

            // Orc
            wrathOfWarlord: () => {
                this.createWrathOfWarlordEffect(balls);
            },
            unstoppableStrength: () => {
                this.startUnstoppableStrength();
            },

            // Human
            lastStand: () => {
                this.lastStandActive = true;
                this.createLastStandEffect(this);
                this.shield = this.maxHp * 0.3;
                this.damageBonus = 0.2;
                // Don't set cooldown yet - it will be set when shield is broken
            },
            herosWrath: () => {
                // Hero's Wrath is now collision-based, not a regular ultimate
                // This should not be called anymore
                console.log("Hero's Wrath should be triggered on collision, not as regular ultimate");
            },

            // Demon
            demonicAscension: () => {
                this.createDemonicAscensionEffect();
                this.damageBonus = 0.3;
                this.lifesteal = 0.3;
                this.demonicAscensionDuration = 4;
            },
            apocalypseFlame: () => {
                // Create the effect (handles damage internally)
                this.createApocalypseFlameEffect(balls);
            }
        };

        const ultimate = ultimateData[this.ultimate];
        if (ultimate) {
            ultimate();
        } else {
            // Default damage
            this.dealDamage(target, 15, { skillName: this.ultimate || 'Unknown Ultimate', skillType: 'ultimate' });
        }
    }

    dealDamage(target, damage, context = {}) {
        // Check for dodge (Sylvan Grace) - only works against projectiles
        // Skip if dodge was already checked in hitTarget (for projectiles)
        if (!context.dodgeAlreadyChecked && target.sylvanGraceActive && context.isProjectile && Math.random() < target.sylvanGraceChance) {
            // Show "Dodged!" text on the target
            this.createFloatingDodgeText(target);
            return; // Attack dodged
        }

        // Check for dodge next attack
        if (target.dodgeNextAttack) {
            target.dodgeNextAttack = false;
            // Show "Dodged!" text on the target
            this.createFloatingDodgeText(target);
            return; // Attack dodged
        }

        // Check if this is bleeding cuts attack
        if (this.attack === 'bleedingCuts') {
            this.createBloodEffect(target);
        }

        if (target.immuneToCC && context.skillName && ['infernalChains', 'naturesGrasp'].includes(context.skillName)) {
            return;
        }


        const fixedDamage = context && context.fixedDamage;

        // Apply damage bonuses
        let finalDamage = damage;

        if (!fixedDamage) {
            // Passive skill bonuses
            if (this.damageBonus) finalDamage *= (1 + this.damageBonus);
            if (this.painEmpowermentBonus) finalDamage *= (1 + this.painEmpowermentBonus);
            if (this.bloodrageBonus) finalDamage *= (1 + this.bloodrageBonus);
            if (this.bloodRageBonus) finalDamage *= (1 + this.bloodRageBonus);
            if (this.savageMomentumStacks) finalDamage *= (1 + this.savageMomentumStacks * 0.1);

            // Bone Crusher bonus against armored enemies
            if (this.boneCrusherBonus && target.defense > 0) {
                finalDamage += this.boneCrusherBonus;
            }

            // Runesmith's Blessing
            if (this.runesmithsBlessingActive && Math.random() < this.runesmithChance) {
                finalDamage += 5;
            }

            // Mana Affinity skill damage boost (only for active skills and ultimates, not basic attacks)
            if (this.manaAffinityActive && context.skillType && (context.skillType === 'active' || context.skillType === 'ultimate')) {
                finalDamage *= 1.3; // 30% skill damage boost
            }
        }

        // Apply defense (Shield Breaker and Elemental Burst ignore defense for basic attacks only)
        let actualDamage;
        if ((this.attack === 'shieldBreaker' || this.attack === 'elementalBurst') && (!context.skillType || context.skillType === 'basic')) {
            // Shield Breaker and Elemental Burst bypass all defense for basic attacks
            actualDamage = finalDamage;
        } else {
            // Ale-Fueled Resilience adds +1 defense when active
            const aleFueledDefense = (target.aleFueledResilienceActive && target.aleFueledResilienceDuration > 0) ? 1 : 0;
            actualDamage = Math.max(1, finalDamage - target.defense - (target.defenseBonus || 0) - (target.ironhideBonus || 0) - (target.stonefleshBonus || 0) - aleFueledDefense);
        }

        // Bonebreaker ignores armor
        if (this.bonebreakerBonus && !fixedDamage) {
            actualDamage = Math.max(1, finalDamage - Math.max(0, target.defense - this.bonebreakerBonus));
        }

        // Apply damage reduction
        if (target.damageReduction) {
            actualDamage *= (1 - target.damageReduction);
        }

        // Apply critical hit
        let critMultiplier = 1;
        const finalCritChance = (context && context.critChance !== undefined) ? context.critChance : this.getCritChance();
        if (Math.random() < finalCritChance) {
            critMultiplier = 2;
            // Show "CRITICAL!" text on the target
            this.createFloatingCriticalText(target);
            // Play critical hit sound
            if (window.gameInstance) {
                window.gameInstance.playSound('Critical_Hit');
            }
            // War Cry stun on crit
            if (this.warCryActive) {
                if (!target.checkCCDodge()) {
                    const stunDuration = target.applyCCDurationReduction(1);
                    target.stunDuration = stunDuration;
                }
            }
        }

        actualDamage *= critMultiplier;

        if (target.fortifyActive && target.fortifyStacks > 0) {
            actualDamage = Math.max(1, Math.ceil(actualDamage / 2)); // 50% damage reduction
            target.consumeFortifyCharge(); // Consume 1 stack and play sound
        }

        // Apply damage to target
        // Check if target has Last Stand shield
        if (target.lastStandActive && target.shield > 0) {
            const shieldBefore = target.shield;
            // Damage shield first
            if (actualDamage >= target.shield) {
                // Shield is broken
                actualDamage -= target.shield;
                target.shield = 0;
                target.lastStandActive = false;
                target.damageBonus = 0;

                // Remove visual effect
                if (window.gameInstance) {
                    window.gameInstance.visualEffects = window.gameInstance.visualEffects.filter(effect =>
                        !(effect.type === 'image' && effect.imageKey === 'lastStand' && effect.followTarget === target)
                    );
                }

                // Set Last Stand on cooldown
                target.ultimateCooldown = 12; // 12 second cooldown
            } else {
                // Shield absorbs all damage
                target.shield -= actualDamage;
                actualDamage = 0;
            }
            const shieldUsed = shieldBefore - target.shield;
            if (shieldUsed > 0 && target.unbreakableBastionShieldValue > 0) {
                target.unbreakableBastionShieldValue = Math.max(0, target.unbreakableBastionShieldValue - shieldUsed);
                if (target.unbreakableBastionShieldValue === 0) {
                    target.unbreakableBastionShieldMax = 0;
                }
            }
        } else if (target.shield > 0) {
            const shieldBefore = target.shield;
            if (actualDamage >= target.shield) {
                actualDamage -= target.shield;
                target.shield = 0;
            } else {
                target.shield -= actualDamage;
                actualDamage = 0;
            }
            const shieldUsed = shieldBefore - target.shield;
            if (target.unbreakableBastionShieldValue > 0) {
                target.unbreakableBastionShieldValue = Math.max(0, target.unbreakableBastionShieldValue - shieldUsed);
                if (target.unbreakableBastionShieldValue === 0) {
                    target.unbreakableBastionShieldMax = 0;
                }
            }
        }

        // Apply remaining damage to HP
        target.hp -= actualDamage;

        // Ensure HP doesn't go below 0
        target.hp = Math.max(0, target.hp);

        // Show floating damage text if damage was dealt
        if (actualDamage > 0 && window.gameInstance) {
            this.createFloatingDamageText(target, Math.round(actualDamage));
        }

        // Soul Reaping heal
        if (this.soulReapingActive) {
            const hpBefore = this.hp;
            this.hp = Math.min(this.maxHp, this.hp + actualDamage * 0.1);
            if (this.hp > hpBefore) {
                this.triggerAleFueledResilience();
            }
        }

        // Blood Frenzy heal
        if (this.bloodFrenzyActive && this.bloodFrenzyStacks > 0) {
            const hpBefore = this.hp;
            const healAmount = actualDamage * 0.5;
            this.hp = Math.min(this.maxHp, this.hp + healAmount);
            if (this.hp > hpBefore) {
                this.triggerAleFueledResilience();
            }
            this.consumeBloodFrenzyStack();
        } else if (this.bloodFrenzyActive) {
            this.bloodFrenzyActive = false;
        }

        // Lifesteal
        if (this.lifesteal) {
            const hpBefore = this.hp;
            this.hp = Math.min(this.maxHp, this.hp + actualDamage * this.lifesteal);
            if (this.hp > hpBefore) {
                this.triggerAleFueledResilience();
            }
        }

        // Mountain's Endurance shield
        if (this.mountainsEnduranceActive) {
            this.shield = (this.shield || 0) + 2;
        }

        // Savage Momentum stacks
        if (this.savageMomentumActive) {
            this.savageMomentumStacks = Math.min(5, (this.savageMomentumStacks || 0) + 1);
        }

        // Berserker's Endurance hit counter
        if (target.berserkersEndurance) {
            target.berserkerHits = (target.berserkerHits || 0) + 1;
        }

        // Blood Pact damage
        if (this.bloodPactDamage) {
            target.hp = Math.max(0, target.hp - this.bloodPactDamage);
            this.bloodPactDamage = 0;
        }

        // Chains of Despair cooldown reduction
        if (this.chainsOfDespairActive) {
            target.cooldownSlow = 0.1;
        }

        // Track damage for console logging
        console.log(`[Damage] ${this.name} dealt ${Math.round(actualDamage)} to ${target.name}. Target HP: ${target.hp.toFixed(1)} / ${target.maxHp}`);
    }

    dealDamageOverTime(target, totalDamage, duration, context = {}) {
        const damagePerSecond = totalDamage / duration;
        const tickInterval = 1000; // 1 second per tick

        let currentDamage = 0;
        const damageInterval = setInterval(() => {
            if (currentDamage >= totalDamage) {
                clearInterval(damageInterval);
                return;
            }

            const damageThisTick = Math.min(damagePerSecond, totalDamage - currentDamage);
            this.dealDamage(target, damageThisTick, context);
            currentDamage += damageThisTick;
        }, tickInterval);
    }

    render(ctx) {
        if (this.headbuttActive && window.gameInstance && window.gameInstance.images.headbutt) {
            const img = window.gameInstance.images.headbutt;
            if (img && img.complete) {
                const size = this.radius * 4;
                ctx.drawImage(img, this.x - size / 2, this.y - size / 2, size, size);
                return;
            }
        }

        // Draw visual effects
        this.renderEffects(ctx);

        // Draw ball
        if (this.imageLoaded && this.customImage) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.clip();
            ctx.drawImage(this.customImage, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
            ctx.restore();
        } else {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.getBallColor();
            ctx.fill();
        }
        this.renderFortifyOverlay(ctx);
        this.renderRuneChargeOverlay(ctx);
        this.renderBattleRoarOverlay(ctx);
        this.renderBloodFrenzyOverlay(ctx);
        this.renderUnstoppableStrengthOverlay(ctx);

        // Draw border with effects
        if (this.stunDuration > 0) {
            ctx.strokeStyle = '#ff0';
            ctx.lineWidth = 4;
        } else if (this.rooted) {
            ctx.strokeStyle = '#0f0';
            ctx.lineWidth = 3;
        } else if (this.shield > 0) {
            ctx.strokeStyle = '#00f';
            ctx.lineWidth = 3;
        } else {
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
        }
        ctx.stroke();

        // Draw name
        ctx.fillStyle = '#fff';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(this.name, this.x, this.y - this.radius - 10);

        // Draw HP bar above ball
        const barWidth = 40;
        const barHeight = 4;
        const barX = this.x - barWidth / 2;
        const barY = this.y - this.radius - 20;

        // Background
        ctx.fillStyle = '#333';
        ctx.fillRect(barX, barY, barWidth, barHeight);

        // HP fill
        const hpPercent = this.hp / this.maxHp;
        ctx.fillStyle = hpPercent > 0.5 ? '#0f0' : hpPercent > 0.25 ? '#ff0' : '#f00';
        ctx.fillRect(barX, barY, barWidth * hpPercent, barHeight);

        // Draw shield bar if active
        if (this.shield > 0) {
            const shieldBarY = barY - 6;
            ctx.fillStyle = '#00f';
            const shieldPercent = this.shield / (this.maxHp * 0.5);
            ctx.fillRect(barX, shieldBarY, barWidth * shieldPercent, 2);
        }

        // Draw status effects
        this.renderStatusEffects(ctx);
    }

    renderEffects(ctx) {
        // Hellfire aura
        if (this.hellfireAuraActive) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 60, 0, Math.PI * 2);
            ctx.strokeStyle = '#ff4400';
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            ctx.stroke();
            ctx.setLineDash([]);
        }

        // Dread aura
        if (this.dreadAuraActive) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 50, 0, Math.PI * 2);
            ctx.strokeStyle = '#4400ff';
            ctx.lineWidth = 2;
            ctx.setLineDash([3, 3]);
            ctx.stroke();
            ctx.setLineDash([]);
        }

        // Spirit of Forest
        if (this.spiritOfForestDuration > 0) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius + 10, 0, Math.PI * 2);
            ctx.strokeStyle = '#00ff00';
            ctx.lineWidth = 2;
            ctx.setLineDash([2, 2]);
            ctx.stroke();
            ctx.setLineDash([]);
        }
    }

    renderStatusEffects(ctx) {
        let effectY = this.y - this.radius - 35;
        const effects = [];

        if (this.stunDuration > 0) effects.push('STUNNED');
        if (this.rooted) effects.push('ROOTED');
        if (this.burnDamage > 0) effects.push('BURNING');
        if (this.slowEffect < 1) effects.push('SLOWED');
        if (this.shield > 0) effects.push('SHIELDED');
        if (this.bloodFrenzyActive) effects.push('BLOOD FRENZY');
        if (this.unstoppableRageDuration > 0) effects.push('RAGING');
        if (this.unstoppableStrengthActive) effects.push('UNSTOPPABLE');
        if (this.demonicAscensionDuration > 0) effects.push('DEMONIC');
        if (this.feared) effects.push('FEARED');

        effects.forEach(effect => {
            ctx.fillStyle = '#fff';
            ctx.font = '10px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(effect, this.x, effectY);
            effectY -= 12;
        });
    }

    renderFortifyOverlay(ctx) {
        if (!this.fortifyActive) return;
        if (!window.gameInstance || !window.gameInstance.images.fortify) return;
        const img = window.gameInstance.images.fortify;
        if (!img || !img.complete || img.naturalWidth === 0) return;
        const size = this.radius * 2;
        const drawX = this.x - size / 2;
        const drawY = this.y - this.radius - size / 2;
        ctx.drawImage(img, drawX, drawY, size, size);
    }

    renderRuneChargeOverlay(ctx) {
        if (!this.runeChargeActive) return;
        if (!window.gameInstance || !window.gameInstance.images) return;
        const frames = ['runeChargeFrame1', 'runeChargeFrame2', 'runeChargeFrame3', 'runeChargeFrame4'];
        const loopDurationMs = 200;
        const now = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
        if (!this.runeChargeAnimationStart) {
            this.runeChargeAnimationStart = now;
        }
        const elapsed = (now - this.runeChargeAnimationStart) % loopDurationMs;
        const frameDuration = loopDurationMs / frames.length;
        const frameIndex = Math.min(frames.length - 1, Math.floor(elapsed / frameDuration));
        const frameKey = frames[frameIndex];
        const img = window.gameInstance.images[frameKey];
        if (!img || !img.complete || img.naturalWidth === 0) return;
        const baseSize = this.radius * 2;
        const size = baseSize * (1 + (frameIndex / (frames.length - 1)));
        ctx.drawImage(img, this.x - size / 2, this.y - size / 2, size, size);
    }

    renderBattleRoarOverlay(ctx) {
        if (this.battleRoarBonusStacks <= 0) return;
        if (!window.gameInstance || !window.gameInstance.images) return;
        const frames = [
            'battleRoarFrame1',
            'battleRoarFrame2',
            'battleRoarFrame3',
            'battleRoarFrame4',
            'battleRoarFrame5',
            'battleRoarFrame6',
            'battleRoarFrame7',
            'battleRoarFrame8'
        ];
        const totalDurationMs = 800;
        const now = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
        if (!this.battleRoarAnimationStart) {
            this.battleRoarAnimationStart = now;
        }
        const elapsed = Math.min(totalDurationMs, now - this.battleRoarAnimationStart);
        const frameDuration = totalDurationMs / frames.length;
        const frameIndex = Math.min(frames.length - 1, Math.floor(elapsed / frameDuration));
        const frameKey = frames[frameIndex];
        const img = window.gameInstance.images[frameKey];
        if (!img || !img.complete || img.naturalWidth === 0) return;
        const size = this.radius * 2;
        ctx.drawImage(img, this.x - size / 2, this.y - size / 2, size, size);
    }

    renderBloodFrenzyOverlay(ctx) {
        if (!this.bloodFrenzyActive || this.bloodFrenzyStacks <= 0) return;
        if (!window.gameInstance || !window.gameInstance.images) return;
        const frames = [
            'bloodFrenzyFrame1',
            'bloodFrenzyFrame2',
            'bloodFrenzyFrame3',
            'bloodFrenzyFrame4',
            'bloodFrenzyFrame5',
            'bloodFrenzyFrame6',
            'bloodFrenzyFrame7',
            'bloodFrenzyFrame8'
        ];
        const totalDurationMs = 800;
        const now = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
        if (!this.bloodFrenzyAnimationStart) {
            this.bloodFrenzyAnimationStart = now;
        }
        const elapsed = (now - this.bloodFrenzyAnimationStart) % totalDurationMs;
        const frameDuration = totalDurationMs / frames.length;
        const frameIndex = Math.min(frames.length - 1, Math.floor(elapsed / frameDuration));
        const frameKey = frames[frameIndex];
        const img = window.gameInstance.images[frameKey];
        if (!img || !img.complete || img.naturalWidth === 0) return;
        const size = this.radius * 2;
        ctx.drawImage(img, this.x - size / 2, this.y - size / 2, size, size);
    }

    renderUnstoppableStrengthOverlay(ctx) {
        if (!this.unstoppableStrengthActive) return;
        if (!window.gameInstance || !window.gameInstance.images) return;
        const frames = [
            'unstoppableRageFrame1',
            'unstoppableRageFrame2',
            'unstoppableRageFrame3',
            'unstoppableRageFrame4',
            'unstoppableRageFrame5',
            'unstoppableRageFrame6',
            'unstoppableRageFrame7',
            'unstoppableRageFrame8'
        ];
        const totalDurationMs = 800;
        const now = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
        if (!this.unstoppableStrengthAnimationStart) {
            this.unstoppableStrengthAnimationStart = now;
        }
        const elapsed = (now - this.unstoppableStrengthAnimationStart) % totalDurationMs;
        const frameDuration = totalDurationMs / frames.length;
        const frameIndex = Math.min(frames.length - 1, Math.floor(elapsed / frameDuration));
        const frameKey = frames[frameIndex];
        const img = window.gameInstance.images[frameKey];
        if (!img || !img.complete || img.naturalWidth === 0) return;
        const size = this.radius * 2;
        ctx.drawImage(img, this.x - size / 2, this.y - size / 2, size, size);
    }

    getBallColor() {
        const colors = {
            human: '#8B4513',
            demon: '#8B0000',
            orc: '#228B22',
            elf: '#90EE90',
            dwarf: '#A0522D',
            barbarian: '#DC143C'
        };
        return colors[this.race] || '#666';
    }

    render(ctx) {
        // Check if Shield Bash is active and show shield image instead of ball
        if (this.shieldBashActive && window.gameInstance && window.gameInstance.images.shieldBash) {
            const img = window.gameInstance.images.shieldBash;
            if (img.complete) {
                // Draw normal ball first (as background)
                ctx.save();
                const raceColors = {
                    human: '#FFD700',
                    demon: '#8B0000',
                    orc: '#228B22',
                    elf: '#90EE90',
                    dwarf: '#A0522D',
                    barbarian: '#DC143C'
                };
                ctx.fillStyle = raceColors[this.race] || '#666';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();

                // Draw Shield Bash image on top
                const size = this.radius * 2; // Match ball size
                ctx.drawImage(img, this.x - size / 2, this.y - size / 2, size, size);
                return;
            }
        } else if (this.headbuttActive && window.gameInstance && window.gameInstance.images.headbutt) {
            const img = window.gameInstance.images.headbutt;
            if (img.complete) {
                const size = this.radius * 4;
                ctx.drawImage(img, this.x - size / 2, this.y - size / 2, size, size);
                return;
            }
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();

        // Draw fill (Image or Color)
        ctx.save();
        ctx.clip();

        if (this.imageLoaded && this.customImage) {
            // Draw image as fill
            const size = this.radius * 2.5; // Scale to ensure coverage
            ctx.drawImage(this.customImage, this.x - size / 2, this.y - size / 2, size, size);
        } else {
            // Draw color fill
            const raceColors = {
                human: '#FFD700',
                demon: '#8B0000',
                orc: '#228B22',
                elf: '#90EE90',
                dwarf: '#A0522D',
                barbarian: '#DC143C'
            };
            ctx.fillStyle = raceColors[this.race] || '#666';
            ctx.fill();
        }
        ctx.restore();

        // Draw border (always)
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.stroke();
        this.renderFortifyOverlay(ctx);
        this.renderRuneChargeOverlay(ctx);
        this.renderBattleRoarOverlay(ctx);
        this.renderBloodFrenzyOverlay(ctx);
        this.renderUnstoppableStrengthOverlay(ctx);

        // Render Spirit Bond Eagle (if active)
        this.renderSpiritBond(ctx);

        ctx.restore();
    }

    // Human Basic Skills
    createBattleFocusEffect(ball) {
        if (!window.gameInstance) return;

        window.gameInstance.createVisualEffect(
            ball.x, ball.y, 'image', 999.0, // Very long duration, will be manually removed when stacks are used
            {
                size: ball.radius, // Half the ball size
                imageKey: 'battleFocus',
                followTarget: ball // Make it follow the ball
            }
        );
    }

    createExecutionStrikeEffect(ball) {
        if (!window.gameInstance) return;

        window.gameInstance.createVisualEffect(
            ball.x, ball.y, 'image', 999.0, // Very long duration, will be manually removed when stacks are used
            {
                size: ball.size * 2, // Match the ball's size
                imageKey: 'executionStrike',
                followTarget: ball // Make it follow the ball
            }
        );
    }

    createShieldBashEffect(target) {
        if (!window.gameInstance) return;

        window.gameInstance.createVisualEffect(
            target.x, target.y, 'explosion', 1.0,
            {
                color: '#C0C0C0',
                size: 25,
                imageKey: 'shieldBash'
            }
        );
    }

    createShieldBashTrailEffect() {
        if (!window.gameInstance) return;

        // Create a trail effect that follows the ball
        window.gameInstance.createVisualEffect(
            this.x, this.y, 'trail', this.shieldBashDuration,
            {
                color: '#C0C0C0',
                size: this.size,
                followTarget: this,
                trailLength: 20
            }
        );
    }

    // Human Basic Attacks
    createFlurryOfBlowsEffect(target) {
        if (!window.gameInstance) return;

        // Create 3 quick hits with Flurry of Blows image
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                window.gameInstance.createVisualEffect(
                    target.x, target.y, 'image', 0.5,
                    {
                        size: 30,
                        imageKey: 'flurryOfBlows'
                    }
                );
            }, i * 200);
        }
    }

    createIronFistEffect(target) {
        if (!window.gameInstance) return;

        window.gameInstance.createVisualEffect(
            target.x, target.y, 'explosion', 1.0,
            {
                color: '#8B4513',
                size: 25,
                imageKey: 'ironFist'
            }
        );
    }

    // Human Ultimate Skills
    createHerosWrathEffect(balls) {
        if (!window.gameInstance) return;

        // Safety check - ensure balls is an array
        if (!Array.isArray(balls)) {
            return;
        }

        // Create multiple empowered strikes
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const target = balls.find(ball => ball !== this);
                if (target) {
                    window.gameInstance.createVisualEffect(
                        target.x, target.y, 'explosion', 1.0,
                        {
                            color: '#FFD700',
                            size: 30,
                            imageKey: 'herosWrath'
                        }
                    );
                }
            }, i * 300);
        }
    }

    createLastStandEffect(ball) {
        if (!window.gameInstance) return;

        window.gameInstance.createVisualEffect(
            ball.x, ball.y - ball.radius - 20, 'image', 999.0, // Position well above ball's head
            {
                size: (ball.radius * 2) / 3, // 1/3 of the ball size
                imageKey: 'lastStand',
                followTarget: ball, // Make it follow the ball
                offsetY: -ball.radius - 20 // Keep it above the ball's head
            }
        );
    }

    createGrappleSlamEffect(target) {
        if (!window.gameInstance) return;

        // Deal damage immediately
        this.dealDamage(target, 5);

        // Apply stun (30% chance)
        if (Math.random() < 0.3) {
            if (!target.checkCCDodge()) {
                const stunDuration = target.applyCCDurationReduction(2);
                target.stunDuration = stunDuration; // 2 second stun (reduced by Iron Will if active)
            }
        }

        // Set grapple slam flag to prevent normal movement
        target.grappleSlamActive = true;

        // Calculate throw direction and distance
        const throwDirection = Math.random() < 0.5 ? -1 : 1; // Left or right
        const throwDistance = 200; // Distance to throw (doubled)
        const finalX = target.x + (throwDirection * throwDistance);
        const finalY = target.y + 80; // Fall down 80 pixels (doubled)

        // Store original position and size
        const originalX = target.x;
        const originalY = target.y;
        const originalRadius = target.radius;

        // Create grab and throw animation
        this.animateGrappleSlam(target, originalX, originalY, finalX, finalY, originalRadius, throwDirection);
    }

    animateGrappleSlam(target, startX, startY, endX, endY, originalRadius, direction) {
        const duration = 1500; // 1.5 seconds total
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1.0);

            // Calculate position - starts moving immediately
            const throwDistance = 200 * progress; // Move 200 pixels over the full duration
            const currentX = startX + (direction * throwDistance);

            // Create an arc: start at original Y, go up, then fall down
            let currentY;
            if (progress < 0.5) {
                // First half: going up
                const upProgress = progress / 0.5;
                currentY = startY - (upProgress * 40); // Go up 40 pixels
            } else {
                // Second half: falling down
                const downProgress = (progress - 0.5) / 0.5;
                const peakY = startY - 40;
                currentY = peakY + (downProgress * (endY - peakY)); // Fall to final Y
            }

            // Set position
            target.x = currentX;
            target.y = currentY;

            // Size animation: grow then shrink
            if (progress < 0.3) {
                // Growing phase (first 30%)
                const growProgress = progress / 0.3;
                target.radius = originalRadius * (1 + growProgress * 0.5); // Grow to 1.5x size
            } else if (progress < 0.7) {
                // Shrinking phase (30% to 70%)
                const shrinkProgress = (progress - 0.3) / 0.4;
                target.radius = originalRadius * (1.5 - shrinkProgress * 0.5); // Shrink back to normal
            } else {
                // Normal size for the rest
                target.radius = originalRadius;
            }

            // Continue animation if not finished
            if (progress < 1.0) {
                requestAnimationFrame(animate);
            } else {
                // Animation complete - ensure final position is set
                target.x = endX;
                target.y = endY;
                target.radius = originalRadius;
                target.grappleSlamActive = false; // Clear the flag
            }
        };

        animate();
    }

    triggerHerosWrath(target) {
        // Play sound effect for Hero's Wrath
        if (window.gameInstance) {
            window.gameInstance.playSound('herosWrath');
        }

        // Set cooldown immediately to prevent multiple triggers
        this.ultimateCooldown = 12; // 12 second cooldown

        // Create 3 consecutive effects on the target with 100ms delay
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                if (target && target.hp > 0) {
                    // Create visual effect on target
                    if (window.gameInstance) {
                        window.gameInstance.createVisualEffect(
                            target.x, target.y, 'image', 0.5,
                            {
                                size: 27, // 2/3 of ball size (40 * 2/3 ≈ 27)
                                imageKey: 'herosWrath'
                            }
                        );
                    }

                    // Deal damage
                    this.dealDamage(target, 7, { skillName: 'herosWrath', skillType: 'ultimate' });
                }
            }, i * 100); // 100ms delay between each hit
        }
    }
}

// Initialize game when page loads
window.addEventListener('load', () => {
    new Game();
});
