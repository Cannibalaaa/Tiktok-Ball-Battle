// Ball Battle Arena - Main Game File
class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.balls = [];
        this.projectiles = [];
        this.visualEffects = [];
        this.gameState = 'selection'; // selection, playing, gameOver
        
        // Load images
        this.images = {};
        this.loadImages();
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
            'warStomp': 'Basic Skill/War Stomp.png',
            'battleFocus': 'Basic Skill/Battle Focus.png',
            'executionStrike': 'Basic Skill/Execution Strike.png',
            'shieldBash': 'Basic Skill/Shield Bash.png',
            'flurryOfBlows': 'basic attack/Flurry of Blows.png',
            'ironFist': 'basic attack/iron fist.png',
            'unarmed': 'basic attack/unarmed.png',
            'anvilOfMountain': 'Ultimate Skill/anvil of the mountain.png',
            'earthshatter': 'Ultimate Skill/Earthshatter.png',
            'herosWrath': 'Ultimate Skill/Heros Wrath.png',
            'lastStand': 'Ultimate Skill/Last Stand.png'
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

    setupEventListeners() {
        document.getElementById('nextButton').addEventListener('click', () => this.nextSelectionStep());
    }

    showSelectionScreen() {
        document.getElementById('selectionScreen').classList.remove('hidden');
    }

    hideSelectionScreen() {
        document.getElementById('selectionScreen').classList.add('hidden');
    }

    nextSelectionStep() {
        switch(this.currentSelectionStep) {
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
            { id: 'human', name: 'Human', stats: 'HP: 100, Defense: 0, Crit: 10%' },
            { id: 'demon', name: 'Demon', stats: 'HP: 80, Defense: 1, Crit: 10%' },
            { id: 'orc', name: 'Orc', stats: 'HP: 80, Defense: 1, Crit: 10%' },
            { id: 'elf', name: 'Elf', stats: 'HP: 85, Defense: 2, Crit: 10%' },
            { id: 'dwarf', name: 'Dwarf', stats: 'HP: 90, Defense: 1, Crit: 10%' },
            { id: 'barbarian', name: 'Barbarian', stats: 'HP: 90, Defense: 0, Crit: 10%' }
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

    getAttacksForWeapon(weapon) {
        const attackData = {
            bow: [
                { id: 'preciseShot', name: 'Precise Shot', description: '1 arrow, high accuracy, 5 damage' },
                { id: 'volley', name: 'Volley', description: '3 arrows, each 3 damage' },
                { id: 'piercingArrow', name: 'Piercing Arrow', description: '1 arrow through enemies, 4 damage each' }
            ],
            dualSword: [
                { id: 'whirlwindSlash', name: 'Whirlwind Slash', description: 'Spin attack, 4 damage to all nearby' },
                { id: 'twinStrikes', name: 'Twin Strikes', description: '2 quick slashes, 3 damage each' },
                { id: 'bleedingCuts', name: 'Bleeding Cuts', description: '4 damage + bleed effect' }
            ],
            sword: [
                { id: 'heavySlash', name: 'Heavy Slash', description: 'Slow but strong, 7 damage' },
                { id: 'quickJab', name: 'Quick Jab', description: 'Fast strike, 4 damage, chance to hit twice' },
                { id: 'shieldBreaker', name: 'Shield Breaker', description: '5 damage, ignores defense' }
            ],
            staff: [
                { id: 'arcaneBolt', name: 'Arcane Bolt', description: 'Magic projectile, 5 damage' },
                { id: 'elementalBurst', name: 'Elemental Burst', description: 'AOE blast, 3 damage per enemy' },
                { id: 'focusedBeam', name: 'Focused Beam', description: 'Concentrated beam, 6 damage' }
            ],
            crossbow: [
                { id: 'sniperBolt', name: 'Sniper Bolt', description: 'High precision, 6 damage' },
                { id: 'scatterShot', name: 'Scatter Shot', description: '2 bolts, each 3 damage' },
                { id: 'explosiveBolt', name: 'Explosive Bolt', description: '4 damage in small area' }
            ],
            unarmed: [
                { id: 'ironFist', name: 'Iron Fist', description: 'Strong punch, 4 damage' },
                { id: 'flurryOfBlows', name: 'Flurry of Blows', description: '3-hit combo, 2 damage each' },
                { id: 'grappleSlam', name: 'Grapple Slam', description: 'Grab and throw, 5 damage' }
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
            { id: 'axeThrow', name: 'Axe Throw', description: 'Hurl axe, medium damage + slow' },
            { id: 'frenziedSlash', name: 'Frenzied Slash', description: 'Wild swing, multiple enemies' },
            { id: 'warStomp', name: 'War Stomp', description: 'Ground slam, AOE + stun' },
            { id: 'battleCry', name: 'Battle Cry', description: 'Boost attack speed and damage' },
            
            // Dwarf
            { id: 'hammerStrike', name: 'Hammer Strike', description: 'Heavy single-target damage' },
            { id: 'stoneToss', name: 'Stone Toss', description: 'Ranged explosive damage' },
            { id: 'fortify', name: 'Fortify', description: 'Reduce damage taken temporarily' },
            { id: 'runeCharge', name: 'Rune Charge', description: 'Next attacks deal bonus damage' },
            
            // Elf
            { id: 'arrowStorm', name: 'Arrow Storm', description: 'Rapid burst of arrows in cone' },
            { id: 'naturesGrasp', name: 'Nature\'s Grasp', description: 'Root enemies in place' },
            { id: 'shadowstep', name: 'Shadowstep', description: 'Dash, become untargetable' },
            { id: 'sylvanMark', name: 'Sylvan Mark', description: 'Mark enemy for bonus damage' },
            
            // Orc
            { id: 'throwingAxe', name: 'Throwing Axe', description: 'High damage, hits multiple in line' },
            { id: 'battleRoar', name: 'Battle Roar', description: 'Increase damage, reduce enemy damage' },
            { id: 'headbutt', name: 'Headbutt', description: 'Charge attack + stun' },
            { id: 'bloodFrenzy', name: 'Blood Frenzy', description: 'Heal on each hit' },
            
            // Human
            { id: 'shieldBash', name: 'Shield Bash', description: '4 damage + stun' },
            { id: 'tacticalRoll', name: 'Tactical Roll', description: 'Dodge + speed boost' },
            { id: 'battleFocus', name: 'Battle Focus', description: 'Increase accuracy and crit' },
            { id: 'executionStrike', name: 'Execution Strike', description: 'Extra damage to low health enemies' },
            
            // Demon
            { id: 'hellfireBolt', name: 'Hellfire Bolt', description: '5 damage + 2 burning over time' },
            { id: 'soulLeech', name: 'Soul Leech', description: '4 damage + heal half' },
            { id: 'dreadAura', name: 'Dread Aura', description: 'Weaken nearby enemies' },
            { id: 'infernalChains', name: 'Infernal Chains', description: 'Immobilize + 3 damage + root' }
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
            { id: 'unstoppableRage', name: 'Unstoppable Rage', description: 'Berserk state: massive attack boost' },
            { id: 'earthshatter', name: 'Earthshatter', description: 'Leap and crash, huge AOE damage' },
            
            // Dwarf
            { id: 'anvilOfMountain', name: 'Anvil of the Mountain', description: 'Giant anvil from above, massive damage' },
            { id: 'unbreakableBastion', name: 'Unbreakable Bastion', description: 'Huge shield + taunt enemies' },
            
            // Elf
            { id: 'rainOfStars', name: 'Rain of Stars', description: 'Celestial barrage, large area' },
            { id: 'spiritOfForest', name: 'Spirit of the Forest', description: 'Ethereal form: speed + damage + regen' },
            
            // Orc
            { id: 'wrathOfWarlord', name: 'Wrath of the Warlord', description: 'Shockwave, damage + knockback' },
            { id: 'unstoppableRageOrc', name: 'Unstoppable Rage', description: 'Immune to CC, massive attack boost' },
            
            // Human
            { id: 'lastStand', name: 'Last Stand', description: 'Shield + bonus damage' },
            { id: 'herosWrath', name: 'Heros Wrath', description: 'Flurry of empowered strikes' },
            
            // Demon
            { id: 'demonicAscension', name: 'Demonic Ascension', description: 'Transform: +30% attack + lifesteal' },
            { id: 'apocalypseFlame', name: 'Apocalypse Flame', description: 'Inferno, 10 damage to all enemies' }
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

    startGame() {
        this.hideSelectionScreen();
        this.gameState = 'playing';
        
        // Create balls
        this.balls = [
            new Ball(1, this.player1.name, this.selectedRace1, this.selectedWeapon1, this.selectedAttack1, this.selectedSkill1, this.selectedUltimate1, 100, 150, this.selectedPassive1),
            new Ball(2, this.player2.name, this.selectedRace2, this.selectedWeapon2, this.selectedAttack2, this.selectedSkill2, this.selectedUltimate2, 300, 150, this.selectedPassive2)
        ];
        
        // Clear projectiles
        this.projectiles = [];
        
        // Set global game instance for projectile creation
        window.gameInstance = this;
        
        // Update UI
        document.getElementById('player1Name').textContent = this.player1.name;
        document.getElementById('player2Name').textContent = this.player2.name;
        
        // Start game loop
        this.gameLoop();
    }

    gameLoop() {
        if (this.gameState !== 'playing') return;
        
        this.update();
        this.render();
        
        requestAnimationFrame(() => this.gameLoop());
    }

    update() {
        this.balls.forEach(ball => {
            ball.update(this.balls, this.canvas.width, this.canvas.height);
        });
        
        // Update projectiles
        this.projectiles = this.projectiles.filter(projectile => {
            return projectile.update(this.balls, this.canvas.width, this.canvas.height);
        });
        
        // Update visual effects
        this.visualEffects = this.visualEffects.filter(effect => {
            return effect.update();
        });
        
        this.updateUI();
    }

    updateUI() {
        // Update HP bars
        const ball1 = this.balls[0];
        const ball2 = this.balls[1];
        
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
            const maxShield = ball.maxHp * 0.3; // Last Stand shield is 30% of max HP
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
        
        skillDiv.innerHTML = `
            <div class="skill-item">
                <div class="skill-name">${basicAttackName}:</div>
                <img src="${basicAttackImage}" class="skill-image" alt="Basic Attack">
                <div class="skill-cooldown">${ball.basicAttackCooldown > 0 ? ball.basicAttackCooldown.toFixed(1) + 's' : 'Ready'}</div>
            </div>
            <div class="skill-item">
                <div class="skill-name">${activeSkillName}:</div>
                <img src="${activeSkillImage}" class="skill-image" alt="Active Skill">
                <div class="skill-cooldown">${ball.activeSkillCooldown > 0 ? ball.activeSkillCooldown.toFixed(1) + 's' : 'Ready'}</div>
            </div>
            <div class="skill-item">
                <div class="skill-name">${ultimateName}:</div>
                <img src="${ultimateImage}" class="skill-image" alt="Ultimate">
                <div class="skill-cooldown">${ball.ultimateCooldown > 0 ? ball.ultimateCooldown.toFixed(1) + 's' : 'Ready'}</div>
            </div>
        `;
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
            'warStomp': 'Basic Skill/War Stomp.png',
            'battleFocus': 'Basic Skill/Battle Focus.png',
            'executionStrike': 'Basic Skill/Execution Strike.png',
            'shieldBash': 'Basic Skill/Shield Bash.png',
            'hammerStrike': 'Basic Skill/Hammer Strike.png',
            'stoneToss': 'Basic Skill/Stone Toss.png',
            'fortify': 'Basic Skill/Fortify.png',
            'runeCharge': 'Basic Skill/Rune Charge.png',
            'arrowStorm': 'Basic Skill/Arrow Storm.png',
            'naturesGrasp': 'Basic Skill/Natures Grasp.png',
            'shadowstep': 'Basic Skill/Shadowstep.png',
            'sylvanMark': 'Basic Skill/Sylvan Mark.png',
            'throwingAxe': 'Basic Skill/Throwing Axe.png',
            'battleRoar': 'Basic Skill/Battle Roar.png',
            'headbutt': 'Basic Skill/Headbutt.png',
            'bloodFrenzy': 'Basic Skill/Blood Frenzy.png',
            'hellfireBolt': 'Basic Skill/Hellfire Bolt.png',
            'soulLeech': 'Basic Skill/Soul Leech.png',
            'dreadAura': 'Basic Skill/Dread Aura.png',
            'infernalChains': 'Basic Skill/Infernal Chains.png',
            
            // Ultimate skills
            'unstoppableRage': 'Ultimate Skill/Unstoppable Rage.png',
            'earthshatter': 'Ultimate Skill/Earthshatter.png',
            'anvilOfMountain': 'Ultimate Skill/anvil of the mountain.png',
            'unbreakableBastion': 'Ultimate Skill/Unbreakable Bastion.png',
            'rainOfStars': 'Ultimate Skill/Rain of Stars.png',
            'spiritOfForest': 'Ultimate Skill/Spirit of Forest.png',
            'wrathOfWarlord': 'Ultimate Skill/Wrath of Warlord.png',
            'unstoppableRageOrc': 'Ultimate Skill/Unstoppable Rage Orc.png',
            'lastStand': 'Ultimate Skill/Last Stand.png',
            'herosWrath': 'Ultimate Skill/Heros Wrath.png',
            'demonicAscension': 'Ultimate Skill/Demonic Ascension.png',
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
            'unbreakableBastion': 'Unbreakable Bastion',
            'rainOfStars': 'Rain of Stars',
            'spiritOfForest': 'Spirit of the Forest',
            'wrathOfWarlord': 'Wrath of the Warlord',
            'unstoppableRageOrc': 'Unstoppable Rage',
            'lastStand': 'Last Stand',
            'herosWrath': 'Hero\'s Wrath',
            'demonicAscension': 'Demonic Ascension',
            'apocalypseFlame': 'Apocalypse Flame'
        };
        
        return nameMap[skillName] || skillName; // Return original name if not found
    }

    showGameOver() {
        const winner = this.balls[0].hp > 0 ? this.balls[0] : this.balls[1];
        alert(`Game Over! ${winner.name} wins!`);
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
        
        // Draw balls
        this.balls.forEach(ball => {
            ball.render(this.ctx);
        });
        
        // Draw visual effects on top of balls
        this.visualEffects.forEach(effect => {
            effect.render(this.ctx);
        });
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

    update() {
        this.duration -= 0.016;
        
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
        
        // Check if this effect has an image
        if (this.imageKey && window.gameInstance && window.gameInstance.images[this.imageKey]) {
            // Special handling for anvilDrop - don't use renderImage
            if (this.type === 'anvilDrop') {
                this.renderAnvilDrop(ctx, progress);
            } else {
                this.renderImage(ctx, progress);
            }
        } else {
            // Fallback to original rendering
            switch(this.type) {
                case 'slash':
                    this.renderSlash(ctx, progress);
                    break;
                case 'explosion':
                    this.renderExplosion(ctx, progress);
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
            }
        }
        
        ctx.restore();
    }

    renderImage(ctx, progress) {
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
                // For weapons, rotate around the ball center
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
                    // Normal weapon rendering
                    ctx.drawImage(img, Math.cos(this.angle) * 30 - width / 2, Math.sin(this.angle) * 30 - height / 2, width, height);
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
            ctx.fillRect(this.x - currentSize/2, currentY - currentSize/2, currentSize, currentSize);
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
}

// Projectile class for ranged attacks
class Projectile {
    constructor(x, y, vx, vy, damage, type, ownerId, targetId = null) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.damage = damage;
        this.type = type;
        this.ownerId = ownerId;
        this.targetId = targetId;
        this.radius = 3;
        this.lifetime = 3; // 3 seconds max lifetime
        this.piercing = false;
        this.explosive = false;
        this.explosionRadius = 30;
    }

    update(balls, canvasWidth, canvasHeight) {
        this.lifetime -= 0.016;

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

        // Deal damage to target
        const owner = balls.find(ball => ball.id === this.ownerId);
        if (owner) {
            owner.dealDamage(target, this.damage);
        }
        
        // Handle explosive projectiles
        if (this.explosive) {
            balls.forEach(ball => {
                if (ball.id !== this.ownerId) {
                    const distance = Math.sqrt((ball.x - this.x) ** 2 + (ball.y - this.y) ** 2);
                    if (distance < this.explosionRadius) {
                        const explosionDamage = this.damage * 0.7;
                        if (owner) {
                            owner.dealDamage(ball, explosionDamage);
                        }
                    }
                }
            });
        }
    }

    render(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        
        // Different colors for different projectile types
        switch(this.type) {
            case 'arrow':
                ctx.fillStyle = '#8B4513';
                break;
            case 'bolt':
                ctx.fillStyle = '#C0C0C0';
                break;
            case 'magic':
                ctx.fillStyle = '#9370DB';
                break;
            case 'explosive':
                ctx.fillStyle = '#FF4500';
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
        
        // Cooldowns
        this.basicAttackCooldown = 0;
        this.activeSkillCooldown = 0;
        this.ultimateCooldown = 0;
        
        // Effects
        this.effects = [];
        
        // Weapon state for melee weapons
        this.weaponActive = false;
        this.weaponEffect = null;
        this.weaponRotation = 0;
        
        // AI state
        this.aiTarget = null;
        this.aiState = 'wandering';
    }

    setRaceStats() {
        const raceStats = {
            human: { maxHp: 100, defense: 0, critChance: 0.1 },
            demon: { maxHp: 80, defense: 1, critChance: 0.1 },
            orc: { maxHp: 80, defense: 1, critChance: 0.1 },
            elf: { maxHp: 85, defense: 2, critChance: 0.1 },
            dwarf: { maxHp: 90, defense: 1, critChance: 0.1 },
            barbarian: { maxHp: 90, defense: 0, critChance: 0.1 }
        };
        
        const stats = raceStats[this.race];
        this.maxHp = stats.maxHp;
        this.hp = this.maxHp;
        this.defense = stats.defense;
        this.critChance = stats.critChance;
        
        // Initialize passive skills - only the selected one
        this.passiveSkills = this.selectedPassive ? [this.selectedPassive] : [];
        this.battleTime = 0;
        this.tacticalRecallUsed = false;
        this.copiedPassive = null;
        
        // Initialize buff stacks
        this.executionStrikeStacks = 0;
        this.battleFocusStacks = 0;
        this.shieldBashActive = false;
        this.lastStandActive = false;
        this.shield = 0;
        this.grappleSlamActive = false;
        this.hellfireAuraActive = false;
        this.corruptedHealing = 0;
        this.shadowPuppeteerChance = 0.1;
        this.bloodPactUsed = false;
        this.ironhideBonus = 0;
        this.boneCrusherBonus = 0;
        this.sylvanGraceChance = 0.1;
        this.manaAffinityBonus = 0.3;
        this.keenSightBonus = 0.3;
        this.ancientWisdomBonus = 0.3;
        this.stonefleshBonus = 2;
        this.runesmithChance = 0.05;
        this.bloodRageBonus = 0;
        this.berserkerHits = 0;
        this.savageMomentumStacks = 0;
        this.bonebreakerBonus = 2;
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
            this[`apply${skill.charAt(0).toUpperCase() + skill.slice(1)}`]();
        });
    }

    applyBattleHardened() {
        // +1% damage and defense every second
        this.battleTime += 0.016;
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
        if (this.copiedPassive === null) {
            // This will be set when battle starts
        }
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
        this.corruptedHealing += 0.5 * 0.016; // 0.5 HP per second
        if (this.corruptedHealing >= 200) {
            this.hp = 0;
        } else {
            this.hp = Math.min(this.maxHp, this.hp + 0.5 * 0.016);
        }
    }

    applyShadowPuppeteer() {
        // 10% chance to cancel enemy's next move
        if (Math.random() < this.shadowPuppeteerChance) {
            this.shadowPuppeteerActive = true;
        }
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

    applyBattleScars() {
        // Small health regeneration
        this.hp = Math.min(this.maxHp, this.hp + 0.2 * 0.016);
    }

    applySylvanGrace() {
        // 10% chance to dodge attacks
        this.sylvanGraceActive = true;
    }

    applyManaAffinity() {
        // 30% faster cooldowns and skill damage boost
        this.manaAffinityActive = true;
    }

    applyForestsBlessing() {
        // Heal when speed is less than 5
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (speed < 5) {
            this.hp = Math.min(this.maxHp, this.hp + 0.3 * 0.016);
        }
    }

    applyKeenSight() {
        // 30% crit chance
        this.critChance += this.keenSightBonus;
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

    applyStoneflesh() {
        // +2 physical resistance
        this.stonefleshBonus = 2;
    }

    applyIronWill() {
        // Negative effects wear off faster
        this.ironWillActive = true;
    }

    applyAleFueledResilience() {
        // Damage resistance when healing
        this.aleFueledResilienceActive = true;
    }

    applyRunesmithsBlessing() {
        // 5% chance for weapons to spark with magic
        this.runesmithsBlessingActive = true;
    }

    applyDeepminersStamina() {
        // Fast HP regen when under half health
        if (this.hp < this.maxHp * 0.5) {
            this.hp = Math.min(this.maxHp, this.hp + 1 * 0.016);
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
            this.hp = Math.min(this.maxHp, this.hp + 10);
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

    update(balls, canvasWidth, canvasHeight) {
        // Apply passive skills
        this.applyPassiveSkills();
        
        // Update cooldowns with passive skill bonuses
        let cooldownReduction = 1;
        if (this.manaAffinityActive) cooldownReduction *= 0.7;
        if (this.ancientWisdomActive) cooldownReduction *= 0.7;
        
        this.basicAttackCooldown = Math.max(0, this.basicAttackCooldown - 0.016 * cooldownReduction);
        this.activeSkillCooldown = Math.max(0, this.activeSkillCooldown - 0.016 * cooldownReduction);
        this.ultimateCooldown = Math.max(0, this.ultimateCooldown - 0.016 * cooldownReduction);
        
        // AI behavior
        this.updateAI(balls);
        
        // Apply speed bonuses
        let speedMultiplier = 1;
        if (this.speedBonus) speedMultiplier *= this.speedBonus;
        if (this.naturesWhisperActive) speedMultiplier *= 1.2;
        if (this.huntersInstinctActive && this.aiTarget && this.aiTarget.hp < this.aiTarget.maxHp * 0.3) {
            speedMultiplier *= 1.3;
        }
        
        // Handle Shield Bash rush
        if (this.shieldBashActive) {
            this.shieldBashDuration -= 0.016;
            
            // Rush toward target
            this.x += this.shieldBashVx;
            this.y += this.shieldBashVy;
            
            // Check if we hit the target
            if (this.shieldBashTarget) {
                const distance = Math.sqrt((this.shieldBashTarget.x - this.x) ** 2 + (this.shieldBashTarget.y - this.y) ** 2);
                if (distance < this.radius + this.shieldBashTarget.radius) {
                    // Hit target - deal damage and stun
                    this.dealDamage(this.shieldBashTarget, this.shieldBashDamage);
                    this.shieldBashTarget.stunDuration = 2;
                    
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
        } else if (!this.grappleSlamActive) {
            // Normal movement (skip if grapple slam is active)
            this.x += this.vx * speedMultiplier;
            this.y += this.vy * speedMultiplier;
        }
        
        // Bounce off walls
        if (this.x - this.radius < 0 || this.x + this.radius > canvasWidth) {
            this.vx = -this.vx;
            this.x = Math.max(this.radius, Math.min(canvasWidth - this.radius, this.x));
        }
        if (this.y - this.radius < 0 || this.y + this.radius > canvasHeight) {
            this.vy = -this.vy;
            this.y = Math.max(this.radius, Math.min(canvasHeight - this.radius, this.y));
        }
        
        // Update effects
        this.updateEffects();
        
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
        
        const closestEnemy = enemies.reduce((closest, enemy) => {
            const dist = Math.sqrt((enemy.x - this.x) ** 2 + (enemy.y - this.y) ** 2);
            const closestDist = Math.sqrt((closest.x - this.x) ** 2 + (closest.y - this.y) ** 2);
            return dist < closestDist ? enemy : closest;
        });
        
        this.aiTarget = closestEnemy;
        
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
    }

    updateWeaponSpinning(balls) {
        // Handle melee weapons (sword, dualSword) and unarmed attacks
        const meleeWeapons = ['sword', 'dualSword'];
        const unarmedAttacks = ['ironFist', 'flurryOfBlows', 'grappleSlam'];
        
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
        const damage = this.getBasicAttackDamage();
        this.dealDamage(target, damage);
        
        // Deactivate weapon and start cooldown
        this.deactivateWeapon();
        this.basicAttackCooldown = 2; // 2 second cooldown
    }

    deactivateWeapon() {
        this.weaponActive = false;
        if (this.weaponEffect) {
            // Remove the weapon effect
            this.weaponEffect.duration = 0;
            this.weaponEffect = null;
        }
    }

    updateEffects() {
        // Update duration-based effects
        if (this.slowDuration) {
            this.slowDuration -= 0.016;
            if (this.slowDuration <= 0) {
                this.slowEffect = 1;
                this.slowDuration = 0;
            }
        }
        
        if (this.stunDuration) {
            this.stunDuration -= 0.016;
            if (this.stunDuration <= 0) {
                this.stunDuration = 0;
            }
        }
        
        if (this.rootDuration) {
            this.rootDuration -= 0.016;
            if (this.rootDuration <= 0) {
                this.rooted = false;
                this.rootDuration = 0;
            }
        }
        
        if (this.burnDuration) {
            this.burnDuration -= 0.016;
            if (this.burnDuration <= 0) {
                this.burnDamage = 0;
                this.burnDuration = 0;
            } else if (this.burnDamage) {
                this.hp = Math.max(0, this.hp - this.burnDamage * 0.016);
            }
        }
        
        if (this.sylvanMarkDuration) {
            this.sylvanMarkDuration -= 0.016;
            if (this.sylvanMarkDuration <= 0) {
                this.sylvanMarked = false;
                this.sylvanMarkDuration = 0;
            }
        }
        
        // Update buff durations
        if (this.battleCryDuration) {
            this.battleCryDuration -= 0.016;
            if (this.battleCryDuration <= 0) {
                this.attackSpeedBonus = 1;
                this.damageBonus = 0;
                this.battleCryDuration = 0;
            }
        }
        
        if (this.fortifyDuration) {
            this.fortifyDuration -= 0.016;
            if (this.fortifyDuration <= 0) {
                this.defenseBonus = 0;
                this.fortifyDuration = 0;
            }
        }
        
        if (this.runeChargeStacks) {
            this.runeChargeStacks -= 1;
            if (this.runeChargeStacks <= 0) {
                this.runeChargeBonus = 0;
                this.runeChargeStacks = 0;
            }
        }
        
        if (this.bloodFrenzyDuration) {
            this.bloodFrenzyDuration -= 0.016;
            if (this.bloodFrenzyDuration <= 0) {
                this.bloodFrenzyActive = false;
                this.bloodFrenzyDuration = 0;
            }
        }
        
        if (this.tacticalRollDuration) {
            this.tacticalRollDuration -= 0.016;
            if (this.tacticalRollDuration <= 0) {
                this.speedBonus = 1;
                this.tacticalRollDuration = 0;
            }
        }
        
        if (this.battleFocusStacks) {
            this.battleFocusStacks -= 1;
            if (this.battleFocusStacks <= 0) {
                this.accuracyBonus = 0;
                this.critChance -= 0.2;
                this.battleFocusStacks = 0;
            }
        }
        
        if (this.dreadAuraDuration) {
            this.dreadAuraDuration -= 0.016;
            if (this.dreadAuraDuration <= 0) {
                this.dreadAuraActive = false;
                this.dreadAuraDuration = 0;
            }
        }
        
        // Ultimate durations
        if (this.unstoppableRageDuration) {
            this.unstoppableRageDuration -= 0.016;
            if (this.unstoppableRageDuration <= 0) {
                this.attackSpeedBonus = 1;
                this.damageBonus = 0;
                this.takeMoreDamage = 0;
                this.unstoppableRageDuration = 0;
            }
        }
        
        if (this.bastionDuration) {
            this.bastionDuration -= 0.016;
            if (this.bastionDuration <= 0) {
                this.tauntEnemies = false;
                this.bastionDuration = 0;
            }
        }
        
        if (this.spiritOfForestDuration) {
            this.spiritOfForestDuration -= 0.016;
            if (this.spiritOfForestDuration <= 0) {
                this.speedBonus = 1;
                this.damageBonus = 0;
                this.hpRegen = 0;
                this.spiritOfForestDuration = 0;
            }
        }
        
        if (this.unstoppableRageOrcDuration) {
            this.unstoppableRageOrcDuration -= 0.016;
            if (this.unstoppableRageOrcDuration <= 0) {
                this.immuneToCC = false;
                this.attackSpeedBonus = 1;
                this.damageBonus = 0;
                this.unstoppableRageOrcDuration = 0;
            }
        }
        
        // Last Stand duration logic removed - it now only ends when shield breaks
        
        if (this.demonicAscensionDuration) {
            this.demonicAscensionDuration -= 0.016;
            if (this.demonicAscensionDuration <= 0) {
                this.damageBonus = 0;
                this.lifesteal = 0;
                this.demonicAscensionDuration = 0;
            }
        }
        
        // Apply HP regeneration
        if (this.hpRegen) {
            this.hp = Math.min(this.maxHp, this.hp + this.hpRegen * 0.016);
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
        // Use basic attack
        if (this.basicAttackCooldown <= 0 && this.aiTarget) {
            const distance = Math.sqrt((this.aiTarget.x - this.x) ** 2 + (this.aiTarget.y - this.y) ** 2);
            const rangedWeapons = ['bow', 'crossbow', 'staff'];
            
            // For ranged weapons, attack from any distance
            // For melee weapons, only attack when close
            if (rangedWeapons.includes(this.weapon) || distance < 50) {
                this.useBasicAttack(this.aiTarget);
            }
        }
        
        // Use active skill
        if (this.activeSkillCooldown <= 0 && this.aiTarget) {
            // Don't use Execution Strike or Battle Focus if they already have stacks
            if ((this.skill === 'executionStrike' && this.executionStrikeStacks > 0) ||
                (this.skill === 'battleFocus' && this.battleFocusStacks > 0)) {
                // Skip using skill if already active
            } else {
                this.useActiveSkill(this.aiTarget, balls);
            }
        }
        
        // Use ultimate
        if (this.ultimateCooldown <= 0 && this.aiTarget) {
            const distance = Math.sqrt((this.aiTarget.x - this.x) ** 2 + (this.aiTarget.y - this.y) ** 2);
            if (distance < 150) {
                this.useUltimate(this.aiTarget, balls);
            }
        }
    }

    useBasicAttack(target) {
        this.basicAttackCooldown = 2; // 2 second cooldown
        
        const damage = this.getBasicAttackDamage();
        
        // Consume Execution Strike stack if active
        if (this.executionStrikeStacks > 0) {
            this.executionStrikeStacks--;
            
            // If this was the last stack, put Execution Strike on cooldown
            if (this.executionStrikeStacks <= 0) {
                this.activeSkillCooldown = 5; // 5 second cooldown
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
                this.activeSkillCooldown = 5; // 5 second cooldown
                // Remove the visual effect
                if (window.gameInstance) {
                    window.gameInstance.visualEffects = window.gameInstance.visualEffects.filter(effect => 
                        !(effect.type === 'image' && effect.imageKey === 'battleFocus' && effect.followTarget === this)
                    );
                }
            }
        }
        
        // Check if this is a ranged weapon
        const rangedWeapons = ['bow', 'crossbow', 'staff'];
        if (rangedWeapons.includes(this.weapon)) {
            // Special handling for volley attack
            if (this.attack === 'volley') {
                this.createVolley(target, damage);
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

    createBattleCryEffect() {
        if (!window.gameInstance) return;
        
        // Create aura effect
        window.gameInstance.createVisualEffect(
            this.x, this.y, 'aura', 2.0,
            { size: 50, color: '#ff0000' }
        );
    }

    createHammerStrikeEffect(target) {
        if (!window.gameInstance) return;
        
        // Create heavy impact effect
        window.gameInstance.createVisualEffect(
            target.x, target.y, 'earth', 0.6,
            { size: 25, color: '#8B4513' }
        );
        
        window.gameInstance.createVisualEffect(
            target.x, target.y, 'explosion', 0.4,
            { size: 30, color: '#ff4400' }
        );
    }

    createStoneTossEffect(balls) {
        if (!window.gameInstance) return;
        
        // Create explosion effect
        window.gameInstance.createVisualEffect(
            this.x, this.y, 'explosion', 0.7,
            { size: 40, color: '#ff6600' }
        );
    }

    createFortifyEffect() {
        if (!window.gameInstance) return;
        
        // Create shield effect
        window.gameInstance.createVisualEffect(
            this.x, this.y, 'shield', 3.0,
            { size: 30, color: '#0088ff' }
        );
    }

    createRuneChargeEffect() {
        if (!window.gameInstance) return;
        
        // Create sparkle effect
        window.gameInstance.createVisualEffect(
            this.x, this.y, 'sparkle', 1.0,
            { size: 25, color: '#ffaa00' }
        );
    }

    createArrowStormEffect(balls) {
        if (!window.gameInstance) return;
        
        // Create multiple arrow effects
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            window.gameInstance.createVisualEffect(
                this.x, this.y, 'slash', 0.8,
                { angle: angle, size: 40, color: '#8B4513' }
            );
        }
    }

    createNaturesGraspEffect(target) {
        if (!window.gameInstance) return;
        
        // Create root effect
        window.gameInstance.createVisualEffect(
            target.x, target.y, 'ice', 2.0,
            { size: 35, color: '#00ff00' }
        );
    }

    createShadowstepEffect() {
        if (!window.gameInstance) return;
        
        // Create smoke effect
        window.gameInstance.createVisualEffect(
            this.x, this.y, 'smoke', 1.0,
            { size: 30, color: '#444444' }
        );
    }

    createSylvanMarkEffect(target) {
        if (!window.gameInstance) return;
        
        // Create mark effect
        window.gameInstance.createVisualEffect(
            target.x, target.y, 'sparkle', 2.0,
            { size: 20, color: '#00ff00' }
        );
    }

    createThrowingAxeEffect(target, balls) {
        if (!window.gameInstance) return;
        
        // Create spinning axe effect
        window.gameInstance.createVisualEffect(
            this.x, this.y, 'slash', 1.0,
            { angle: Math.atan2(target.y - this.y, target.x - this.x), size: 45, color: '#8B4513' }
        );
        
        // Create line effect for multiple hits
        window.gameInstance.createVisualEffect(
            this.x, this.y, 'beam', 0.5,
            { targetX: target.x, targetY: target.y, color: '#ff6600' }
        );
    }

    createBattleRoarEffect(balls) {
        if (!window.gameInstance) return;
        
        // Create roar effect
        window.gameInstance.createVisualEffect(
            this.x, this.y, 'aura', 2.0,
            { size: 60, color: '#ff0000' }
        );
    }

    createHeadbuttEffect(target) {
        if (!window.gameInstance) return;
        
        // Create headbutt effect
        window.gameInstance.createVisualEffect(
            target.x, target.y, 'explosion', 0.4,
            { size: 20, color: '#ff4400' }
        );
    }

    createBloodFrenzyEffect() {
        if (!window.gameInstance) return;
        
        // Create frenzy effect
        window.gameInstance.createVisualEffect(
            this.x, this.y, 'fire', 2.0,
            { size: 40, color: '#ff0000' }
        );
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

    createHellfireBoltEffect(target) {
        if (!window.gameInstance) return;
        
        // Create hellfire effect
        window.gameInstance.createVisualEffect(
            target.x, target.y, 'fire', 1.0,
            { size: 20, color: '#ff4400' }
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

    createDreadAuraEffect() {
        if (!window.gameInstance) return;
        
        // Create dread aura effect
        window.gameInstance.createVisualEffect(
            this.x, this.y, 'dark', 2.0,
            { size: 50, color: '#440044' }
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
        
        // Create massive shield effect
        window.gameInstance.createVisualEffect(
            this.x, this.y, 'shield', 4.0,
            { size: 50, color: '#0088ff' }
        );
    }

    createRainOfStarsEffect(balls) {
        if (!window.gameInstance) return;
        
        // Create multiple star effects
        for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2;
            const distance = 75;
            const x = this.x + Math.cos(angle) * distance;
            const y = this.y + Math.sin(angle) * distance;
            window.gameInstance.createVisualEffect(
                x, y, 'light', 1.5,
                { size: 20, color: '#ffff00' }
            );
        }
    }

    createSpiritOfForestEffect() {
        if (!window.gameInstance) return;
        
        // Create spirit transformation effect
        window.gameInstance.createVisualEffect(
            this.x, this.y, 'light', 3.0,
            { size: 45, color: '#00ff00' }
        );
    }

    createWrathOfWarlordEffect(balls) {
        if (!window.gameInstance) return;
        
        // Create massive shockwave
        window.gameInstance.createVisualEffect(
            this.x, this.y, 'explosion', 1.2,
            { size: 100, color: '#ff0000' }
        );
    }

    createUnstoppableRageOrcEffect() {
        if (!window.gameInstance) return;
        
        // Create berserker effect
        window.gameInstance.createVisualEffect(
            this.x, this.y, 'fire', 2.5,
            { size: 55, color: '#ff4400' }
        );
    }

    createLastStandEffect() {
        if (!window.gameInstance) return;
        
        // Create last stand effect
        window.gameInstance.createVisualEffect(
            this.x, this.y, 'light', 3.0,
            { size: 40, color: '#ffff00' }
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
        
        // Create demonic transformation
        window.gameInstance.createVisualEffect(
            this.x, this.y, 'dark', 3.0,
            { size: 50, color: '#440044' }
        );
    }

    createApocalypseFlameEffect(balls) {
        if (!window.gameInstance) return;
        
        // Create massive fire effect
        window.gameInstance.createVisualEffect(
            this.x, this.y, 'fire', 2.0,
            { size: 100, color: '#ff4400' }
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

    createProjectile(target, damage) {
        // Calculate direction to target
        const dx = target.x - this.x;
        const dy = target.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance === 0) return; // Avoid division by zero
        
        // Normalize direction and set speed
        const speed = 8;
        const vx = (dx / distance) * speed;
        const vy = (dy / distance) * speed;
        
        // Determine projectile type based on weapon
        let projectileType = 'arrow';
        let piercing = false;
        let explosive = false;
        
        switch(this.weapon) {
            case 'bow':
                projectileType = 'arrow';
                if (this.attack === 'piercingArrow') {
                    piercing = true;
                }
                break;
            case 'crossbow':
                projectileType = 'bolt';
                if (this.attack === 'explosiveBolt') {
                    explosive = true;
                }
                break;
            case 'staff':
                projectileType = 'magic';
                break;
        }
        
        // Create projectile
        const projectile = new Projectile(
            this.x, this.y, vx, vy, damage, projectileType, this.id, target.id
        );
        
        projectile.piercing = piercing;
        projectile.explosive = explosive;
        
        // Add heat seeking for bow/crossbow during Battle Focus
        if (this.battleFocusStacks > 0 && (this.weapon === 'bow' || this.weapon === 'crossbow')) {
            projectile.heatSeeking = true;
            projectile.targetId = target.id;
        }
        
        // Add to game projectiles (we need to access the game instance)
        // We'll handle this in the game class
        if (window.gameInstance) {
            window.gameInstance.projectiles.push(projectile);
        }
    }

    getBasicAttackDamage() {
        const attackData = {
            preciseShot: 5,
            volley: 3,
            piercingArrow: 4,
            whirlwindSlash: 4,
            twinStrikes: 3,
            bleedingCuts: 4,
            heavySlash: 7,
            quickJab: 4,
            shieldBreaker: 5,
            arcaneBolt: 5,
            elementalBurst: 3,
            focusedBeam: 6,
            sniperBolt: 6,
            scatterShot: 3,
            explosiveBolt: 4,
            ironFist: 4,
            flurryOfBlows: 2,
            grappleSlam: 5
        };
        
        let baseDamage = attackData[this.attack] || 5;
        
        // Apply Execution Strike bonus if active
        if (this.executionStrikeStacks > 0) {
            baseDamage += 6; // +6 damage bonus
        }
        
        return baseDamage;
    }

    getCritChance() {
        let critChance = this.critChance;
        
        // Apply Battle Focus bonus if active
        if (this.battleFocusStacks > 0) {
            critChance += 0.7; // +70% crit chance
        }
        
        return Math.min(critChance, 1.0); // Cap at 100%
    }

    useActiveSkill(target, balls) {
        // Don't set cooldown for Execution Strike or Battle Focus - they will be set when stacks are used up
        if (this.skill !== 'executionStrike' && this.skill !== 'battleFocus') {
            this.activeSkillCooldown = 5; // 5 second cooldown
        }
        
        // Implement active skill logic based on selected skill
        this.executeActiveSkill(target, balls);
    }

    executeActiveSkill(target, balls) {
        const skillData = {
            // Barbarian
            axeThrow: () => {
                const damage = 8;
                this.createAxeThrowEffect(target);
                this.dealDamage(target, damage);
                // Slow effect
                target.slowEffect = 0.5;
                target.slowDuration = 3;
            },
            frenziedSlash: () => {
                const damage = 6;
                this.createFrenziedSlashEffect(balls);
                balls.forEach(ball => {
                    if (ball.id !== this.id) {
                        const distance = Math.sqrt((ball.x - this.x) ** 2 + (ball.y - this.y) ** 2);
                        if (distance < 50) {
                            this.dealDamage(ball, damage);
                        }
                    }
                });
            },
            warStomp: () => {
                const damage = 7;
                this.createWarStompEffect(balls);
                balls.forEach(ball => {
                    if (ball.id !== this.id) {
                        const distance = Math.sqrt((ball.x - this.x) ** 2 + (ball.y - this.y) ** 2);
                        if (distance < 60) {
                            this.dealDamage(ball, damage);
                            ball.stunDuration = 2;
                        }
                    }
                });
            },
            battleCry: () => {
                this.createBattleCryEffect();
                this.attackSpeedBonus = 1.5;
                this.damageBonus = 0.3;
                this.battleCryDuration = 5;
            },
            
            // Dwarf
            hammerStrike: () => {
                const damage = 12;
                this.createHammerStrikeEffect(target);
                this.dealDamage(target, damage);
            },
            stoneToss: () => {
                const damage = 10;
                this.createStoneTossEffect(balls);
                balls.forEach(ball => {
                    if (ball.id !== this.id) {
                        const distance = Math.sqrt((ball.x - this.x) ** 2 + (ball.y - this.y) ** 2);
                        if (distance < 80) {
                            this.dealDamage(ball, damage);
                        }
                    }
                });
            },
            fortify: () => {
                this.createFortifyEffect();
                this.defenseBonus = 3;
                this.fortifyDuration = 8;
            },
            runeCharge: () => {
                this.createRuneChargeEffect();
                this.runeChargeStacks = 3;
                this.runeChargeBonus = 0.5;
            },
            
            // Elf
            arrowStorm: () => {
                const damage = 5;
                this.createArrowStormEffect(balls);
                balls.forEach(ball => {
                    if (ball.id !== this.id) {
                        const distance = Math.sqrt((ball.x - this.x) ** 2 + (ball.y - this.y) ** 2);
                        if (distance < 70) {
                            this.dealDamage(ball, damage);
                        }
                    }
                });
            },
            naturesGrasp: () => {
                this.createNaturesGraspEffect(target);
                target.rootDuration = 4;
                target.rooted = true;
            },
            shadowstep: () => {
                this.createShadowstepEffect();
                // Teleport to random nearby location
                const angle = Math.random() * Math.PI * 2;
                const distance = 80;
                this.x += Math.cos(angle) * distance;
                this.y += Math.sin(angle) * distance;
                this.untargetableDuration = 1;
            },
            sylvanMark: () => {
                this.createSylvanMarkEffect(target);
                target.sylvanMarked = true;
                target.sylvanMarkDuration = 10;
            },
            
            // Orc
            throwingAxe: () => {
                const damage = 10;
                this.createThrowingAxeEffect(target, balls);
                this.dealDamage(target, damage);
                // Can hit multiple enemies in line
                balls.forEach(ball => {
                    if (ball.id !== this.id && ball.id !== target.id) {
                        const distance = Math.sqrt((ball.x - this.x) ** 2 + (ball.y - this.y) ** 2);
                        if (distance < 100) {
                            this.dealDamage(ball, damage * 0.7);
                        }
                    }
                });
            },
            battleRoar: () => {
                this.createBattleRoarEffect(balls);
                this.damageBonus = 0.4;
                this.battleRoarDuration = 6;
                // Reduce enemy damage
                balls.forEach(ball => {
                    if (ball.id !== this.id) {
                        ball.damageReduction = 0.2;
                        ball.damageReductionDuration = 6;
                    }
                });
            },
            headbutt: () => {
                const damage = 8;
                this.createHeadbuttEffect(target);
                this.dealDamage(target, damage);
                target.stunDuration = 2;
            },
            bloodFrenzy: () => {
                this.createBloodFrenzyEffect();
                this.bloodFrenzyActive = true;
                this.bloodFrenzyDuration = 8;
            },
            
            // Human
            shieldBash: () => {
                // Transform ball into shield and rush toward enemy
                this.shieldBashActive = true;
                this.shieldBashTarget = target;
                this.shieldBashDuration = 1.0; // 1 second rush
                this.shieldBashDamage = 4;
                
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
                // Empower next 3 basic attacks instead of dealing direct damage
                this.battleFocusStacks = 3;
                this.createBattleFocusEffect(this); // Effect follows the ball
                // Don't put skill on cooldown yet - it will be set when stacks are used up
            },
            executionStrike: () => {
                // Empower next 3 basic attacks instead of dealing direct damage
                this.executionStrikeStacks = 3;
                this.createExecutionStrikeEffect(this); // Effect follows the ball
                // Don't put skill on cooldown yet - it will be set when stacks are used up
            },
            
            // Demon
            hellfireBolt: () => {
                const damage = 5;
                this.createHellfireBoltEffect(target);
                this.dealDamage(target, damage);
                target.burnDamage = 2;
                target.burnDuration = 3;
            },
            soulLeech: () => {
                const damage = 4;
                this.createSoulLeechEffect(target);
                this.dealDamage(target, damage);
                this.hp = Math.min(this.maxHp, this.hp + damage * 0.5);
            },
            dreadAura: () => {
                this.createDreadAuraEffect();
                this.dreadAuraActive = true;
                this.dreadAuraDuration = 8;
            },
            infernalChains: () => {
                const damage = 3;
                this.createInfernalChainsEffect(target);
                this.dealDamage(target, damage);
                target.rootDuration = 4;
                target.rooted = true;
            }
        };
        
        const skill = skillData[this.skill];
        if (skill) {
            skill();
        } else {
            // Default damage
            this.dealDamage(target, 8);
        }
    }

    useUltimate(target, balls) {
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
        
        // Don't set cooldown for Last Stand - it will be set when shield is broken
        if (this.ultimate !== 'lastStand') {
            this.ultimateCooldown = 15; // 15 second cooldown
        }
        
        // Implement ultimate skill logic based on selected ultimate
        this.executeUltimate(target, balls);
    }

    executeUltimate(target, balls) {
        const ultimateData = {
            // Barbarian
            unstoppableRage: () => {
                this.createUnstoppableRageEffect();
                this.attackSpeedBonus = 2.0;
                this.damageBonus = 0.8;
                this.unstoppableRageDuration = 10;
                this.takeMoreDamage = 0.2;
            },
            earthshatter: () => {
                const damage = 20;
                
                // Find closest enemy for dash direction
                const enemies = balls.filter(ball => ball.id !== this.id);
                if (enemies.length > 0) {
                    const closestEnemy = enemies.reduce((closest, enemy) => {
                        const dist = Math.sqrt((enemy.x - this.x) ** 2 + (enemy.y - this.y) ** 2);
                        const closestDist = Math.sqrt((closest.x - this.x) ** 2 + (closest.y - this.y) ** 2);
                        return dist < closestDist ? enemy : closest;
                    });
                    
                    // Dash towards the closest enemy
                    const dashDistance = 80;
                    const angle = Math.atan2(closestEnemy.y - this.y, closestEnemy.x - this.x);
                    this.x += Math.cos(angle) * dashDistance;
                    this.y += Math.sin(angle) * dashDistance;
                    
                    // Keep within canvas bounds
                    this.x = Math.max(this.radius, Math.min(window.gameInstance.canvas.width - this.radius, this.x));
                    this.y = Math.max(this.radius, Math.min(window.gameInstance.canvas.height - this.radius, this.y));
                }
                
                this.createEarthshatterEffect(balls);
                
                // Create dash line effect for Earthshatter
                this.createEarthshatterDashEffect();
                
                balls.forEach(ball => {
                    if (ball.id !== this.id) {
                        const distance = Math.sqrt((ball.x - this.x) ** 2 + (ball.y - this.y) ** 2);
                        if (distance < 100) {
                            this.dealDamage(ball, damage);
                            // Knockback effect
                            const angle = Math.atan2(ball.y - this.y, ball.x - this.x);
                            ball.vx += Math.cos(angle) * 5;
                            ball.vy += Math.sin(angle) * 5;
                        }
                    }
                });
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
                                    this.dealDamage(ball, damage);
                                }
                            }
                        });
                    }, 2000); // 2 seconds delay
                }
            },
            unbreakableBastion: () => {
                this.createUnbreakableBastionEffect();
                this.shield = this.maxHp * 0.5;
                this.tauntEnemies = true;
                this.bastionDuration = 8;
            },
            
            // Elf
            rainOfStars: () => {
                const damage = 8;
                this.createRainOfStarsEffect(balls);
                balls.forEach(ball => {
                    if (ball.id !== this.id) {
                        const distance = Math.sqrt((ball.x - this.x) ** 2 + (ball.y - this.y) ** 2);
                        if (distance < 150) {
                            this.dealDamage(ball, damage);
                        }
                    }
                });
            },
            spiritOfForest: () => {
                this.createSpiritOfForestEffect();
                this.speedBonus = 1.8;
                this.damageBonus = 0.6;
                this.hpRegen = 2;
                this.spiritOfForestDuration = 12;
            },
            
            // Orc
            wrathOfWarlord: () => {
                const damage = 18;
                this.createWrathOfWarlordEffect(balls);
                balls.forEach(ball => {
                    if (ball.id !== this.id) {
                        const distance = Math.sqrt((ball.x - this.x) ** 2 + (ball.y - this.y) ** 2);
                        if (distance < 80) {
                            this.dealDamage(ball, damage);
                            // Knockback effect
                            const angle = Math.atan2(ball.y - this.y, ball.x - this.x);
                            ball.vx += Math.cos(angle) * 4;
                            ball.vy += Math.sin(angle) * 4;
                        }
                    }
                });
            },
            unstoppableRageOrc: () => {
                this.createUnstoppableRageOrcEffect();
                this.immuneToCC = true;
                this.attackSpeedBonus = 2.5;
                this.damageBonus = 1.0;
                this.unstoppableRageOrcDuration = 8;
            },
            
            // Human
            lastStand: () => {
                this.lastStandActive = true;
                this.createLastStandEffect(this);
                this.shield = this.maxHp * 0.3;
                this.damageBonus = 0.5;
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
                this.demonicAscensionDuration = 10;
            },
            apocalypseFlame: () => {
                const damage = 10;
                this.createApocalypseFlameEffect(balls);
                balls.forEach(ball => {
                    if (ball.id !== this.id) {
                        const distance = Math.sqrt((ball.x - this.x) ** 2 + (ball.y - this.y) ** 2);
                        if (distance < 200) {
                            this.dealDamage(ball, damage);
                            ball.burnDamage = 3;
                            ball.burnDuration = 5;
                        }
                    }
                });
            }
        };
        
        const ultimate = ultimateData[this.ultimate];
        if (ultimate) {
            ultimate();
        } else {
            // Default damage
            this.dealDamage(target, 15);
        }
    }

    dealDamage(target, damage) {
        // Check for dodge (Sylvan Grace)
        if (target.sylvanGraceActive && Math.random() < target.sylvanGraceChance) {
            return; // Attack dodged
        }
        
        // Check for dodge next attack
        if (target.dodgeNextAttack) {
            target.dodgeNextAttack = false;
            return; // Attack dodged
        }
        
        // Check if this is bleeding cuts attack
        if (this.attack === 'bleedingCuts') {
            this.createBloodEffect(target);
        }
        
        // Apply damage bonuses
        let finalDamage = damage;
        
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
        
        // Apply defense
        let actualDamage = Math.max(1, finalDamage - target.defense - (target.defenseBonus || 0) - (target.ironhideBonus || 0) - (target.stonefleshBonus || 0));
        
        // Bonebreaker ignores armor
        if (this.bonebreakerBonus) {
            actualDamage = Math.max(1, finalDamage - Math.max(0, target.defense - this.bonebreakerBonus));
        }
        
        // Apply damage reduction
        if (target.damageReduction) {
            actualDamage *= (1 - target.damageReduction);
        }
        
        // Apply critical hit
        let critMultiplier = 1;
        if (Math.random() < this.getCritChance()) {
            critMultiplier = 2;
            // War Cry stun on crit
            if (this.warCryActive) {
                target.stunDuration = 1;
            }
        }
        
        actualDamage *= critMultiplier;
        
        // Apply damage to target
        // Check if target has Last Stand shield
        if (target.lastStandActive && target.shield > 0) {
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
                target.ultimateCooldown = 15; // 15 second cooldown
            } else {
                // Shield absorbs all damage
                target.shield -= actualDamage;
                actualDamage = 0;
            }
        }
        
        // Apply remaining damage to HP
        target.hp -= actualDamage;
        
        // Ensure HP doesn't go below 0
        target.hp = Math.max(0, target.hp);
        
        // Soul Reaping heal
        if (this.soulReapingActive) {
            this.hp = Math.min(this.maxHp, this.hp + actualDamage * 0.1);
        }
        
        // Blood Frenzy heal
        if (this.bloodFrenzyActive) {
            this.hp = Math.min(this.maxHp, this.hp + actualDamage * 0.15);
        }
        
        // Lifesteal
        if (this.lifesteal) {
            this.hp = Math.min(this.maxHp, this.hp + actualDamage * this.lifesteal);
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
        
        // Sylvan Mark bonus damage
        if (target.sylvanMarked) {
            target.hp = Math.max(0, target.hp - actualDamage * 0.3);
        }
    }

    render(ctx) {
        // Draw visual effects
        this.renderEffects(ctx);
        
        // Draw ball
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.getBallColor();
        ctx.fill();
        
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
        if (this.demonicAscensionDuration > 0) effects.push('DEMONIC');
        
        effects.forEach(effect => {
            ctx.fillStyle = '#fff';
            ctx.font = '10px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(effect, this.x, effectY);
            effectY -= 12;
        });
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
                const size = this.radius * 2; // Match ball size
                ctx.drawImage(img, this.x - size/2, this.y - size/2, size, size);
                return;
            }
        }

        // Normal ball rendering
        ctx.save();
        
        // Get race color
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
        
        // Draw border
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.stroke();
        
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
            target.stunDuration = 2; // 2 second stun
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
        // Set cooldown immediately to prevent multiple triggers
        this.ultimateCooldown = 15; // 15 second cooldown
        
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
                    this.dealDamage(target, 5);
                }
            }, i * 100); // 100ms delay between each hit
        }
    }
}

// Initialize game when page loads
window.addEventListener('load', () => {
    new Game();
});
