# Use PyMySQL as a drop-in replacement for MySQLdb so django can use MySQL
# without requiring the system-level mysqlclient C extension.
try:
	import pymysql
	pymysql.install_as_MySQLdb()
except Exception:
	# If PyMySQL is not installed, importing will fail here. In that case,
	# Django will still try to import the real MySQLdb (mysqlclient) and raise
	# the original error — that's fine and expected.
	pass

