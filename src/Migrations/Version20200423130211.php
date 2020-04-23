<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200423130211 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE advance (id INT AUTO_INCREMENT NOT NULL, invoice_id INT DEFAULT NULL, amount DOUBLE PRECISION DEFAULT NULL, INDEX IDX_E7811BF32989F1FD (invoice_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE company (id INT AUTO_INCREMENT NOT NULL, company_name VARCHAR(255) NOT NULL, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, address VARCHAR(255) NOT NULL, postal_code VARCHAR(255) NOT NULL, city VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, tel VARCHAR(255) NOT NULL, legal_mention1 VARCHAR(255) DEFAULT NULL, legal_mention2 VARCHAR(255) DEFAULT NULL, legal_mention3 VARCHAR(255) DEFAULT NULL, rcs VARCHAR(255) DEFAULT NULL, logo VARCHAR(255) DEFAULT NULL, token VARCHAR(255) DEFAULT NULL, password VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE customer (id INT AUTO_INCREMENT NOT NULL, company_id INT DEFAULT NULL, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, address VARCHAR(255) NOT NULL, postal_code VARCHAR(255) NOT NULL, city VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, tel VARCHAR(255) NOT NULL, INDEX IDX_81398E09979B1AD6 (company_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE description (id INT AUTO_INCREMENT NOT NULL, estimate_id INT DEFAULT NULL, devlivery VARCHAR(255) DEFAULT NULL, quantity DOUBLE PRECISION DEFAULT NULL, unit VARCHAR(255) DEFAULT NULL, unit_price DOUBLE PRECISION DEFAULT NULL, tva DOUBLE PRECISION DEFAULT NULL, ht_amount DOUBLE PRECISION DEFAULT NULL, ttc_amount DOUBLE PRECISION DEFAULT NULL, INDEX IDX_6DE4402685F23082 (estimate_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE estimate (id INT AUTO_INCREMENT NOT NULL, invoice_id INT DEFAULT NULL, company_id INT DEFAULT NULL, customer_id INT DEFAULT NULL, created_at DATETIME DEFAULT NULL, ht_amount DOUBLE PRECISION DEFAULT NULL, ttc_amount DOUBLE PRECISION DEFAULT NULL, UNIQUE INDEX UNIQ_D2EA46072989F1FD (invoice_id), INDEX IDX_D2EA4607979B1AD6 (company_id), INDEX IDX_D2EA46079395C3F3 (customer_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE invoice (id INT AUTO_INCREMENT NOT NULL, company_id INT DEFAULT NULL, created_at DATETIME DEFAULT NULL, total_advance DOUBLE PRECISION DEFAULT NULL, remaining DOUBLE PRECISION DEFAULT NULL, ht_amount DOUBLE PRECISION DEFAULT NULL, ttc_amount DOUBLE PRECISION DEFAULT NULL, INDEX IDX_90651744979B1AD6 (company_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE advance ADD CONSTRAINT FK_E7811BF32989F1FD FOREIGN KEY (invoice_id) REFERENCES invoice (id)');
        $this->addSql('ALTER TABLE customer ADD CONSTRAINT FK_81398E09979B1AD6 FOREIGN KEY (company_id) REFERENCES company (id)');
        $this->addSql('ALTER TABLE description ADD CONSTRAINT FK_6DE4402685F23082 FOREIGN KEY (estimate_id) REFERENCES estimate (id)');
        $this->addSql('ALTER TABLE estimate ADD CONSTRAINT FK_D2EA46072989F1FD FOREIGN KEY (invoice_id) REFERENCES invoice (id)');
        $this->addSql('ALTER TABLE estimate ADD CONSTRAINT FK_D2EA4607979B1AD6 FOREIGN KEY (company_id) REFERENCES company (id)');
        $this->addSql('ALTER TABLE estimate ADD CONSTRAINT FK_D2EA46079395C3F3 FOREIGN KEY (customer_id) REFERENCES customer (id)');
        $this->addSql('ALTER TABLE invoice ADD CONSTRAINT FK_90651744979B1AD6 FOREIGN KEY (company_id) REFERENCES company (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE customer DROP FOREIGN KEY FK_81398E09979B1AD6');
        $this->addSql('ALTER TABLE estimate DROP FOREIGN KEY FK_D2EA4607979B1AD6');
        $this->addSql('ALTER TABLE invoice DROP FOREIGN KEY FK_90651744979B1AD6');
        $this->addSql('ALTER TABLE estimate DROP FOREIGN KEY FK_D2EA46079395C3F3');
        $this->addSql('ALTER TABLE description DROP FOREIGN KEY FK_6DE4402685F23082');
        $this->addSql('ALTER TABLE advance DROP FOREIGN KEY FK_E7811BF32989F1FD');
        $this->addSql('ALTER TABLE estimate DROP FOREIGN KEY FK_D2EA46072989F1FD');
        $this->addSql('DROP TABLE advance');
        $this->addSql('DROP TABLE company');
        $this->addSql('DROP TABLE customer');
        $this->addSql('DROP TABLE description');
        $this->addSql('DROP TABLE estimate');
        $this->addSql('DROP TABLE invoice');
    }
}
