import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const versionDb = await database.query("SHOW server_version;");
  const maxConnections = await database.query("SHOW max_connections;");
  const dataBaseName = process.env.POSTGRES_DB;
  const openedConnections = await database.query({
    text: "SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [dataBaseName],
  });

  response.status(200).json({
    updated_At: updatedAt,
    dependencies: {
      database: {
        version: versionDb.rows[0].server_version,
        max_Connections: parseInt(maxConnections.rows[0].max_connections),
        opened_Connections: openedConnections.rows[0].count,
      },
    },
  });
}

export default status;
