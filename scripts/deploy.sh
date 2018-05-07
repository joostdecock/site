#!/bin/bash
cd /home/joost/git/v2/site/deploy
#echo "Dumping production database on lin"
#ssh joost@lin.freesewing.org mysqldump freesewing_data -u admin -pExcelWiz! > /tmp/db.sql
echo "Importing database"
echo "DROP TABLE comments, drafts, errors, models, referrals, users, tasks, confirmations;" | mysql -u admin -pExcelWiz! freesewing_data
cat db.sql | mysql -u admin -pExcelWiz! freesewing_data
echo "Migrating database structure"
echo "
ALTER TABLE users DROP INDEX email;
ALTER TABLE users DROP INDEX username;
ALTER TABLE users DROP INDEX user;

ALTER TABLE users ADD UNIQUE(handle);

ALTER TABLE users CHANGE email email VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'email address';
ALTER TABLE users CHANGE patron_since patronSince DATETIME NULL DEFAULT NULL;
ALTER TABLE users ADD locale CHAR(2) NOT NULL DEFAULT 'en' AFTER picture;
ALTER TABLE users CHANGE ehash ehash CHAR(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL;
ALTER TABLE users CHANGE pepper pepper CHAR(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Random string used for reset tokens and such';
ALTER TABLE users CHANGE initial initial VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Email address the user signed up with';
ALTER TABLE users ADD modelConsent BOOLEAN NOT NULL DEFAULT FALSE AFTER status;
ALTER TABLE users ADD profileConsent BOOLEAN NOT NULL DEFAULT FALSE AFTER status;
CREATE TABLE confirmations (
  id int(6) NOT NULL,
  data text NOT NULL,
  time datetime NOT NULL,
  expires datetime NOT NULL,
  nonce varchar(64) NOT NULL,
  hash char(40) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
ALTER TABLE confirmations ADD PRIMARY KEY (id), ADD KEY hash (hash);
ALTER TABLE confirmations MODIFY id int(6) NOT NULL AUTO_INCREMENT;
CREATE TABLE tasks (
  id int(6) NOT NULL,
  type enum('emailSignup', 'emailChange') NOT NULL,
  data text NOT NULL,
  notBefore datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
ALTER TABLE tasks ADD PRIMARY KEY (id);
ALTER TABLE tasks MODIFY id int(6) NOT NULL AUTO_INCREMENT;
" | mysql -u admin -pExcelWiz! freesewing_data
echo "Migrating database data"
wget -q --no-check-certificate https://data.she.freesewing.org/migrate -O -
wget -q --no-check-certificate https://data.she.freesewing.org/migrate -O -
wget -q --no-check-certificate https://data.she.freesewing.org/migrate -O -
wget -q --no-check-certificate https://data.she.freesewing.org/migrate -O -
wget -q --no-check-certificate https://data.she.freesewing.org/migrate -O -
wget -q --no-check-certificate https://data.she.freesewing.org/migrate -O -
wget -q --no-check-certificate https://data.she.freesewing.org/migrate -O -
wget -q --no-check-certificate https://data.she.freesewing.org/migrate -O -
echo "Configuring database indexes"
echo "
ALTER TABLE users ADD UNIQUE(username);
ALTER TABLE users ADD UNIQUE(ehash);
" | mysql -u admin -pExcelWiz! freesewing_data
echo "Syncronising storage"
sudo chown -R joost /fs/storage/data/master
rsync -aptP joost@lin.freesewing.org:/fs/storage/data/master/ /fs/storage/data/master/
sudo chown -R www-data /fs/storage/data/master
echo "All done"
