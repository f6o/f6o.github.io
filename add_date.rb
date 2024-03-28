#!/usr/bin/ruby

require 'date'

MDFILE=ARGV[0]

unless File.exist? MDFILE
    puts "file not found: #{MDFILE}"
    exit 1
end

## example: Date:   Mon Nov 23 12:51:00 2020 +0900
LATESTCOMMIT=`git log -n 1 #{MDFILE} | grep ^Date`
d = DateTime.parse(LATESTCOMMIT)

## Jekyll date format should be like this: "date: YYYY-MM-DD HH:MM:SS +/-TTTT"
## https://jekyllrb.com/docs/front-matter/
fp = File.open(MDFILE, "r")
lines = fp.readlines
fp.close


if lines[0].start_with? '---'
    File.open(MDFILE, "w") {|fp|
        fp.write lines[0]
        fp.puts d.strftime('date: %Y-%m-%d %T %z')
        lines.slice(1, lines.length-1).each{|line|
            fp.write line
        }
    }
end