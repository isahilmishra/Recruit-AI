export const getHealth = (req, res) => {
    res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
    });
};
export const dbHealth = async (req, res) => {
    try {
        const url = process.env.DATABASE_URL || 'UNDEFINED';
        const maskedUrl = url.replace(/:([^:@]+)@/, ":***@");
        res.status(200).json({
            status: 'ok',
            database_url: maskedUrl,
        });
    }
    catch (e) {
        res.status(500).json({ status: 'error', message: e.message });
    }
};
//# sourceMappingURL=health.controller.js.map