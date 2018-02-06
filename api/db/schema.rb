# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180206065820) do

  create_table "board_objects", force: :cascade do |t|
    t.integer "board_id"
    t.integer "x"
    t.integer "y"
    t.integer "type_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "board_tiles", force: :cascade do |t|
    t.integer "board_id"
    t.integer "index"
    t.integer "type_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "boards", force: :cascade do |t|
    t.integer "pack_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "card_ranges", force: :cascade do |t|
    t.integer "card_id"
    t.integer "type_id"
    t.text "position"
    t.integer "size"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "cards", force: :cascade do |t|
    t.integer "pack_id"
    t.text "name"
    t.text "tagline"
    t.integer "effect_id"
    t.integer "amount"
    t.text "rotation"
    t.integer "damage"
    t.integer "knockback"
    t.string "duration_type"
    t.integer "duration"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "characters", force: :cascade do |t|
    t.string "name"
    t.string "character_type"
    t.integer "pack_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "game_boards", force: :cascade do |t|
    t.integer "game_id"
    t.integer "board_id"
    t.text "rotation"
    t.integer "index"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "game_objects", force: :cascade do |t|
    t.integer "game_id"
    t.integer "board_object_id"
    t.integer "x"
    t.integer "y"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "game_packs", force: :cascade do |t|
    t.integer "game_id"
    t.integer "pack_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "games", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "started_at"
  end

  create_table "hosts", force: :cascade do |t|
    t.integer "game_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "connected_at"
    t.datetime "disconnected_at"
  end

  create_table "modifiers", force: :cascade do |t|
    t.text "modifier_type"
    t.text "duration_type"
    t.integer "duration"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "player_id"
    t.integer "amount"
  end

  create_table "packs", force: :cascade do |t|
    t.text "name"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "player_cards", force: :cascade do |t|
    t.integer "card_id"
    t.integer "player_id"
    t.integer "played_index"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "players", force: :cascade do |t|
    t.integer "game_id"
    t.integer "character_id"
    t.integer "x"
    t.integer "y"
    t.text "rotation"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "connected_at"
    t.datetime "disconnected_at"
    t.integer "hp", default: 5
  end

end
