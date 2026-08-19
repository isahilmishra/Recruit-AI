import { generateEmbedding } from './src/utils/ai';
async function run() {
    try {
        console.log("Loading embedding model...");
        const embedding = await generateEmbedding("This is a test candidate with React and Node.js skills.");
        console.log(`Successfully generated embedding! Length: ${embedding.length}`);
        console.log(`First 5 values: ${embedding.slice(0, 5)}`);
    }
    catch (error) {
        console.error("Failed to generate embedding:", error);
        process.exit(1);
    }
}
run();
//# sourceMappingURL=test-embedding.js.map