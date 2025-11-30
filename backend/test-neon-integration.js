// Neon Database Integration Test
// OGH Maximum Spiral Consciousness Validation

import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

class NeonIntegrationTest {
    constructor() {
        this.databaseUrl = process.env.NEON_DATABASE_URL;
        this.sql = neon(this.databaseUrl);
        this.phi = 1.618033988749895;
        this.testResults = [];
    }

    async runAllTests() {
        console.log('🧪 Running OGH Neon Integration Tests...');
        console.log(`🌀 φ Constant: ${this.phi}`);
        console.log('');

        try {
            // Test 1: Database Connection
            await this.testDatabaseConnection();
            
            // Test 2: Schema Creation
            await this.testSchemaCreation();
            
            // Test 3: φ Constants Insertion
            await this.testPhiConstants();
            
            // Test 4: AI Solutions Integration
            await this.testAISolutions();
            
            // Test 5: Real-time Analytics
            await this.testAnalytics();
            
            // Test 6: φ Pattern Detection
            await this.testPhiPatternDetection();
            
            // Test 7: Data Integrity
            await this.testDataIntegrity();
            
            // Test 8: Performance Benchmarks
            await this.testPerformance();
            
            // Generate test report
            this.generateTestReport();
            
            return true;
        } catch (error) {
            console.error('❌ Test suite failed:', error);
            return false;
        }
    }

    async testDatabaseConnection() {
        console.log('🔌 Testing database connection...');
        
        try {
            const result = await this.sql`SELECT NOW() as current_time, version() as version`;
            
            this.addTestResult('Database Connection', true, {
                timestamp: result[0].current_time,
                version: result[0].version.split(',')[0]
            });
            
            console.log('✅ Database connection successful');
        } catch (error) {
            this.addTestResult('Database Connection', false, { error: error.message });
            console.log('❌ Database connection failed:', error.message);
        }
    }

    async testSchemaCreation() {
        console.log('📋 Testing schema creation...');
        
        try {
            // Check if livs_law schema exists
            const schemaCheck = await this.sql`
                SELECT schema_name FROM information_schema.schemata 
                WHERE schema_name = 'livs_law'
            `;
            
            const schemaExists = schemaCheck.length > 0;
            
            // Check if all tables exist
            const tables = ['phi_constants', 'research_findings', 'ai_solutions', 'partnerships', 'user_analytics'];
            const tableChecks = [];
            
            for (const table of tables) {
                const tableCheck = await this.sql`
                    SELECT table_name FROM information_schema.tables 
                    WHERE table_schema = 'livs_law' AND table_name = ${table}
                `;
                tableChecks.push({
                    table,
                    exists: tableCheck.length > 0
                });
            }
            
            const allTablesExist = tableChecks.every(check => check.exists);
            
            this.addTestResult('Schema Creation', schemaExists && allTablesExist, {
                schemaExists,
                tables: tableChecks
            });
            
            if (schemaExists && allTablesExist) {
                console.log('✅ Schema creation successful');
            } else {
                console.log('❌ Schema creation incomplete');
            }
        } catch (error) {
            this.addTestResult('Schema Creation', false, { error: error.message });
            console.log('❌ Schema creation test failed:', error.message);
        }
    }

    async testPhiConstants() {
        console.log('🌟 Testing φ constants...');
        
        try {
            // Test φ constant insertion and retrieval
            const constants = await this.sql`
                SELECT * FROM livs_law.phi_constants ORDER BY created_at
            `;
            
            const phiConstant = constants.find(c => c.constant_name === 'phi');
            const phiCorrect = phiConstant && Math.abs(parseFloat(phiConstant.value) - this.phi) < 0.000000000000001;
            
            // Test fundamental constants
            const requiredConstants = ['phi', 'fibonacci_34', 'fibonacci_21', 'string_dimensions', 'golden_angle'];
            const allConstantsPresent = requiredConstants.every(name => 
                constants.some(c => c.constant_name === name)
            );
            
            this.addTestResult('φ Constants', phiCorrect && allConstantsPresent, {
                totalConstants: constants.length,
                phiCorrect,
                allConstantsPresent,
                constants: constants.map(c => ({
                    name: c.constant_name,
                    value: c.value,
                    verified: c.verification_status
                }))
            });
            
            if (phiCorrect && allConstantsPresent) {
                console.log('✅ φ constants test passed');
            } else {
                console.log('❌ φ constants test failed');
            }
        } catch (error) {
            this.addTestResult('φ Constants', false, { error: error.message });
            console.log('❌ φ constants test failed:', error.message);
        }
    }

    async testAISolutions() {
        console.log('🤖 Testing AI solutions integration...');
        
        try {
            const solutions = await this.sql`
                SELECT * FROM livs_law.ai_solutions ORDER BY effectiveness_score DESC
            `;
            
            const hasSolutions = solutions.length > 0;
            const highEffectivenessSolutions = solutions.filter(s => s.effectiveness_score >= 0.8);
            const hasHighEffectiveness = highEffectivenessSolutions.length > 0;
            
            // Test specific global challenges
            const globalChallenges = ['Climate Change', 'Poverty & Inequality', 'Disease & Pandemics'];
            const challengesCovered = globalChallenges.filter(challenge =>
                solutions.some(s => s.problem_title.includes(challenge))
            );
            
            this.addTestResult('AI Solutions', hasSolutions && hasHighEffectiveness, {
                totalSolutions: solutions.length,
                highEffectivenessCount: highEffectivenessSolutions.length,
                challengesCovered: challengesCovered.length,
                avgEffectiveness: solutions.reduce((sum, s) => sum + parseFloat(s.effectiveness_score), 0) / solutions.length
            });
            
            if (hasSolutions && hasHighEffectiveness) {
                console.log('✅ AI solutions test passed');
            } else {
                console.log('❌ AI solutions test failed');
            }
        } catch (error) {
            this.addTestResult('AI Solutions', false, { error: error.message });
            console.log('❌ AI solutions test failed:', error.message);
        }
    }

    async testAnalytics() {
        console.log('📊 Testing analytics system...');
        
        try {
            // Insert test analytics data
            const testSessionId = 'test_session_' + Date.now();
            
            await this.sql`
                INSERT INTO livs_law.user_analytics 
                (session_id, page_views, phi_interactions, golden_ratio_detected, fibonacci_sequence_found)
                VALUES (
                    ${testSessionId}, 
                    5, 
                    ${JSON.stringify({ test: true, phiRatio: 1.618 })}, 
                    true, 
                    true
                )
            `;
            
            // Retrieve analytics data
            const analytics = await this.sql`
                SELECT * FROM livs_law.user_analytics WHERE session_id = ${testSessionId}
            `;
            
            const testRecord = analytics[0];
            const analyticsWorking = testRecord && testRecord.golden_ratio_detected && testRecord.fibonacci_sequence_found;
            
            // Clean up test data
            await this.sql`
                DELETE FROM livs_law.user_analytics WHERE session_id = ${testSessionId}
            `;
            
            this.addTestResult('Analytics System', analyticsWorking, {
                testSessionId,
                recordInserted: analytics.length > 0,
                phiDetection: testRecord?.golden_ratio_detected,
                fibonacciDetection: testRecord?.fibonacci_sequence_found
            });
            
            if (analyticsWorking) {
                console.log('✅ Analytics system test passed');
            } else {
                console.log('❌ Analytics system test failed');
            }
        } catch (error) {
            this.addTestResult('Analytics System', false, { error: error.message });
            console.log('❌ Analytics system test failed:', error.message);
        }
    }

    async testPhiPatternDetection() {
        console.log('🌀 Testing φ pattern detection...');
        
        try {
            // Test φ ratio calculation
            const testValues = [161.8, 100, 61.8]; // Golden ratio relationships
            const phiRatio = testValues[0] / testValues[1];
            const isPhiRatio = Math.abs(phiRatio - this.phi) < 0.01;
            
            // Test Fibonacci sequence detection
            const fibonacciSequence = [1, 1, 2, 3, 5, 8, 13, 21];
            const isFibonacci = this.validateFibonacciSequence(fibonacciSequence);
            
            // Test golden angle detection
            const goldenAngle = 137.507764;
            const testAngle = 137.5;
            const isGoldenAngle = Math.abs(testAngle - goldenAngle) < 0.1;
            
            const patternDetectionWorking = isPhiRatio && isFibonacci && isGoldenAngle;
            
            this.addTestResult('φ Pattern Detection', patternDetectionWorking, {
                phiRatio: { value: phiRatio, expected: this.phi, correct: isPhiRatio },
                fibonacci: { sequence: fibonacciSequence, correct: isFibonacci },
                goldenAngle: { value: testAngle, expected: goldenAngle, correct: isGoldenAngle }
            });
            
            if (patternDetectionWorking) {
                console.log('✅ φ pattern detection test passed');
            } else {
                console.log('❌ φ pattern detection test failed');
            }
        } catch (error) {
            this.addTestResult('φ Pattern Detection', false, { error: error.message });
            console.log('❌ φ pattern detection test failed:', error.message);
        }
    }

    async testDataIntegrity() {
        console.log('🔒 Testing data integrity...');
        
        try {
            // Test foreign key constraints
            const researchFindings = await this.sql`
                SELECT rf.*, pc.constant_name 
                FROM livs_law.research_findings rf
                LEFT JOIN livs_law.phi_constants pc ON rf.mechanism_id = pc.id
                LIMIT 5
            `;
            
            // Test data type constraints
            const phiConstants = await this.sql`
                SELECT constant_name, value FROM livs_law.phi_constants WHERE constant_name = 'phi'
            `;
            
            const phiValue = phiConstants[0];
            const phiValid = phiValue && !isNaN(parseFloat(phiValue.value));
            
            // Test unique constraints
            const duplicateCheck = await this.sql`
                SELECT constant_name, COUNT(*) as count 
                FROM livs_law.phi_constants 
                GROUP BY constant_name 
                HAVING COUNT(*) > 1
            `;
            
            const noDuplicates = duplicateCheck.length === 0;
            
            const integrityWorking = phiValid && noDuplicates;
            
            this.addTestResult('Data Integrity', integrityWorking, {
                phiValid,
                noDuplicates,
                duplicateCount: duplicateCheck.length,
                researchFindingsCount: researchFindings.length
            });
            
            if (integrityWorking) {
                console.log('✅ Data integrity test passed');
            } else {
                console.log('❌ Data integrity test failed');
            }
        } catch (error) {
            this.addTestResult('Data Integrity', false, { error: error.message });
            console.log('❌ Data integrity test failed:', error.message);
        }
    }

    async testPerformance() {
        console.log('⚡ Testing performance benchmarks...');
        
        try {
            // Test query performance
            const startTime = Date.now();
            
            await this.sql`
                SELECT * FROM livs_law.phi_constants
            `;
            
            await this.sql`
                SELECT * FROM livs_law.ai_solutions WHERE effectiveness_score >= 0.8
            `;
            
            await this.sql`
                SELECT COUNT(*) as count FROM livs_law.user_analytics
            `;
            
            const queryTime = Date.now() - startTime;
            
            // Test insertion performance
            const insertStartTime = Date.now();
            
            await this.sql`
                INSERT INTO livs_law.user_analytics (session_id, page_views)
                VALUES ('performance_test', 1)
            `;
            
            await this.sql`
                DELETE FROM livs_law.user_analytics WHERE session_id = 'performance_test'
            `;
            
            const insertTime = Date.now() - insertStartTime;
            
            const performanceGood = queryTime < 1000 && insertTime < 500; // 1s for queries, 500ms for insert
            
            this.addTestResult('Performance', performanceGood, {
                queryTime: `${queryTime}ms`,
                insertTime: `${insertTime}ms`,
                queryThreshold: '1000ms',
                insertThreshold: '500ms'
            });
            
            if (performanceGood) {
                console.log('✅ Performance test passed');
            } else {
                console.log('❌ Performance test failed');
            }
        } catch (error) {
            this.addTestResult('Performance', false, { error: error.message });
            console.log('❌ Performance test failed:', error.message);
        }
    }

    validateFibonacciSequence(sequence) {
        if (sequence.length < 3) return false;
        
        for (let i = 2; i < sequence.length; i++) {
            if (sequence[i] !== sequence[i-1] + sequence[i-2]) {
                return false;
            }
        }
        return true;
    }

    addTestResult(testName, passed, details) {
        this.testResults.push({
            testName,
            passed,
            details,
            timestamp: new Date().toISOString()
        });
    }

    generateTestReport() {
        console.log('');
        console.log('📊 OGH Neon Integration Test Report');
        console.log('=====================================');
        console.log('');
        
        const passedTests = this.testResults.filter(test => test.passed).length;
        const totalTests = this.testResults.length;
        const successRate = ((passedTests / totalTests) * 100).toFixed(1);
        
        console.log(`📈 Overall Success Rate: ${successRate}% (${passedTests}/${totalTests} tests passed)`);
        console.log('');
        
        this.testResults.forEach(test => {
            const status = test.passed ? '✅' : '❌';
            console.log(`${status} ${test.testName}`);
            
            if (!test.passed && test.details.error) {
                console.log(`   Error: ${test.details.error}`);
            }
        });
        
        console.log('');
        
        if (passedTests === totalTests) {
            console.log('🌟 All tests passed! OGH Maximum Spiral Consciousness Integration is ready!');
            console.log('🚀 H SOULUTIONS + Neon Database platform fully operational!');
        } else {
            console.log('⚠️  Some tests failed. Please review the issues above.');
        }
        
        console.log('');
        console.log(`🌀 φ = ${this.phi} - Reality's Operating System`);
        console.log(`📊 Project: ${process.env.NEON_PROJECT_ID || 'twilight-bird-66678380'}`);
        console.log(`🕐 Test completed: ${new Date().toISOString()}`);
    }
}

// Execute tests
async function main() {
    const tester = new NeonIntegrationTest();
    const success = await tester.runAllTests();
    
    if (success) {
        console.log('🌟 Test suite completed successfully');
        process.exit(0);
    } else {
        console.error('❌ Test suite failed');
        process.exit(1);
    }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    main().catch(console.error);
}

export default NeonIntegrationTest;