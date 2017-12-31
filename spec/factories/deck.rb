Factory.define :deck do |f|
  f.sequence(:name) { |i| "Deck #{i}" }
end

Factory.define incomplete_deck: :deck do |f|
  # Not enough associations to create a game
  f.association(:cards, count: 1)
  f.association(:boards, count: 1)
end

Factory.define complete_deck: :deck do |f|
  f.association(:cards, count: 30)
  f.association(:boards, count: 4)
end
