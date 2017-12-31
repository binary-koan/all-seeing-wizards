Factory.define :card do |f|
  f.sequence(:name) { |i| "Deck #{i}" }
  f.effect "move"
  f.amount 1
end
